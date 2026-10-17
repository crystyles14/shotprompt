(function(root){
'use strict';
const SP=root.SP;
const sources={
h3:['MiniMax H3 shot and cut guide','https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md'],
seedance:['Seedance 2.0 multi-shot guidance','https://seed.bytedance.com/en/blog/seedance-2-0-official-launch'],
seedance25:['Seedance family guidance','https://seed.bytedance.com/en/blog/seedance-2-0-official-launch'],
wan26:['Wan 2.6 shot-type settings','https://www.alibabacloud.com/help/en/model-studio/legacy-wan-text-to-video-api-reference'],
wan3:['Wan 3.0 shots and timestamps','https://help.aliyun.com/en/model-studio/wan3-video-generation-prompt-guide'],
kling3:['Kling 3.0 Custom Multi-Shot guide','https://kling.ai/quickstart/klingai-video-3-model-user-guide']
};
function active(s){return s.type==='video'&&s.timelineMode!=='off'&&(s.videoTask==='new'||s.videoTask==='extend'&&s.timelineMode==='continuous');}
const round=n=>Math.round(n*1000)/1000,seconds=n=>String(round(+n)),stamp=n=>{const ms=Math.round(+n*1000),m=Math.floor(ms/60000),sec=Math.floor(ms%60000/1000);return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')+'.'+String(ms%1000).padStart(3,'0');};
function make(s,start,end,action=''){return {coverage:'inherit',angle:'inherit',composition:'inherit',start:round(start),end:round(end),action,shot:s.shot,move:s.move,speed:s.speed,direction:s.direction,transition:'cut'};}
function fit(s){if(!s.beats.length)return s;return {...s,beats:s.beats.map((b,i)=>({...b,start:round(s.duration*i/s.beats.length),end:round(s.duration*(i+1)/s.beats.length)}))};}
function initialize(s,mode){const next={...s,timelineMode:mode};if(mode!=='off'&&!s.beats.length){next.beats=[make(s,0,s.duration/2,s.action),make(s,s.duration/2,s.duration,'')];}return next;}
function frame(s,b){return ({wide:'Wide shot, including the surroundings.',medium:!['general','people'].includes(s.category)?'Medium framing showing the subject in context.':'Medium shot of the subject.',close:'Close-up of the main subject.',detail:'Extreme close-up of one small detail.'})[b.shot];}
function camera(s,b){return SP.cameraText({...s,move:b.move,speed:b.speed,direction:b.direction}).replace('remain constant throughout','remain constant during this segment');}
function shotText(s,b){return b.action.trim()+' '+frame(s,b)+' Camera: '+camera(s,b)+(root.SPCinema?' '+root.SPCinema.shotParts(s,b):'');}
function compose(s,c){
if(!s.beats.length)return '';
const extension=s.videoTask==='extend',multi=s.timelineMode==='multi';
const plan=s.beats.map((b,i)=>{const content=extension?c.dot(b.action):shotText(s,b);
if(!multi)return '['+seconds(b.start)+'–'+seconds(b.end)+'s] '+content;
const transition=i===0?'':b.transition==='dissolve'?'Cross-dissolve to ':b.transition==='continue'?'Continue seamlessly into ':'Hard cut to ';
if(s.model==='h3')return '[Shot '+(i+1)+'] '+(i?'At '+stamp(b.start)+', '+(b.transition==='dissolve'?'the shot cross-dissolves to ':b.transition==='continue'?'the shot continues seamlessly into ':'the camera cuts to '):'')+content;
if(s.model==='seedance'||s.model==='seedance25')return 'Shot '+(i+1)+' ('+seconds(b.end-b.start)+' seconds requested): '+transition+content;
if(s.model==='kling3')return 'Shot '+(i+1)+' — duration '+seconds(b.end-b.start)+' seconds: '+transition+content;
return 'Shot '+(i+1)+' ['+seconds(b.start)+'–'+seconds(b.end)+'s]: '+transition+content;}).join('\n');
let scene=extension?'':c.dot(s.idea)+' '+c.light+' '+c.style;
let body;
if(extension){const v=s.refs.findIndex(r=>r.kind==='video');body='Continue '+(v<0?'the source video':SP.refName(s,v))+' forward from its final frame for '+s.duration+' seconds. Timing below starts at 0 seconds of the NEW extension, not the original clip.\nMatch the boundary frame, identity, clothing, setting, lighting, camera trajectory and established sound. Continue without replaying preceding action. Inherit the source aspect ratio.\nOne continuous extension, with no cuts.\n'+plan;}
else body=scene+'\n'+(multi?'Generate '+s.beats.length+' shots in the listed order over '+s.duration+' seconds. Preserve character, object and setting continuity across shots.':'One continuous take, '+s.duration+' seconds, with no cuts. Camera changes below are continuous movements within this take.')+'\n'+plan;
const speech=s.dialogue.trim()?(root.SPCinema?root.SPCinema.speaker(s):s.speaker)+' says exactly: '+JSON.stringify(s.dialogue.trim())+'. No additional dialogue.':'No spoken dialogue.';
const extras=[...(!extension?c.extra:[]),s.extra.trim()?'Additional instructions: '+c.dot(s.extra):'',s.negative.trim()?'Avoid: '+c.dot(s.negative):'',extension?'':'Composition: '+s.ratio+' aspect ratio.'].filter(Boolean).join('\n');
if(s.model==='h3'&&!extension){const first=multi?'':'[Shot 1] ';if(multi)body='[Shot 1] '+scene+' Total clip duration: '+s.duration+' seconds. '+plan.replace(/^\[Shot 1\]\s*/,'');return (c.references?'Reference mapping:\n'+c.references+'\n\n':'')+'integrated_multimodal_description: '+first+body+'\n'+speech+'\n'+extras+'\n\noverall_soundscape: '+s.audio+'\n\nnon_diegetic_music: '+(/\bno (?:background )?music\b/i.test(s.audio)?'N/A':'Use only the background music explicitly requested in the audio instructions; otherwise none.');}
return [c.references,body,!extension?speech:'',!extension?'Audio: '+c.dot(s.audio):'',extras].filter(Boolean).join('\n\n');
}
function warnings(s,text){
if(s.type!=='video')return [];const w=[],add=(code,message,field='timing',evidence)=>w.push({code,message,field,evidence,scope:'builder'});
if(s.videoTask==='edit')return w;
if(s.videoTask==='extend'&&s.timelineMode==='multi'){add('timingextension','Multiple-shot settings are saved but not emitted for extensions. Choose Timed continuous for actions inside the new extension.');return w;}
if(!active(s))return w;
if(!s.beats.length){add('timingempty','Add at least one timed segment.');return w;}
if(s.timelineMode==='multi'&&s.beats.length<2)add('timingcount','Multiple shots needs at least two segments.');
let prior=0;for(const [i,b] of s.beats.entries()){
if(b.end<=b.start)add('timingorder'+i,'Segment '+(i+1)+' must end after it starts.','timing',b.start+'–'+b.end+'s');
if(b.start<0||b.end>s.duration)add('timingbounds'+i,'Segment '+(i+1)+' lies outside the chosen clip duration.','timing',b.start+'–'+b.end+'s');
if(Math.abs(b.start-prior)>.001)add('timinggap'+i,'Segment '+(i+1)+' leaves a gap or overlaps its predecessor. Use Fit to duration or edit the time ranges.','timing',b.start+'s start, '+prior+'s expected');
if(!b.action.trim())add('timingaction'+i,'Describe the action in segment '+(i+1)+'.');
if(s.videoTask==='new'){
const positive=b.action.replace(/\b(?:no|without|avoid)\s+[^.!?;\n]+/gi,'');
if(b.move==='static'&&/\b(?:camera (?:moves|pans|tilts|zooms|orbits)|dolly (?:in|out)|tracking shot)\b/i.test(positive))add('timingcamera'+i,'Segment '+(i+1)+' selects a still camera but describes camera movement.');
if(b.move!=='static'&&/\b(?:static camera|locked.off camera|no camera movement|camera (?:stays|remains) still)\b/i.test(b.action))add('timingstill'+i,'Segment '+(i+1)+' selects movement but asks for a still camera.');
const opposite={pan:b.direction==='left'?/\bcamera pans? right\b/i:/\bcamera pans? left\b/i,tilt:b.direction==='down'?/\bcamera tilts? up\b/i:/\bcamera tilts? down\b/i,zoom:b.direction==='out'?/\bzoom in\b/i:/\bzoom out\b/i,orbit:b.direction==='counter'?/\bclockwise orbit\b/i:/\bcounterclockwise orbit\b/i}[b.move];
if(opposite&&opposite.test(positive))add('timingdirection'+i,'Segment '+(i+1)+' describes a different camera direction from its selection.');
if(s.lens==='macro'&&b.shot==='wide')add('timinglens'+i,'Segment '+(i+1)+' uses wide framing with the global macro lens feel.','lens');
if(s.timelineMode==='continuous'&&i&&b.shot!==s.beats[i-1].shot&&b.move==='static')add('timingframing'+i,'Segment '+(i+1)+' changes framing with a still camera in a continuous take. Describe a continuous camera move or keep the framing.');
}
prior=b.end;}
if(Math.abs(prior-s.duration)>.001)add('timingend','The last segment should end at the chosen duration.','timing',prior+'s plan, '+s.duration+'s clip');
if(s.timelineMode==='multi'&&/\b(?:no cuts|single continuous shot|one continuous take)\b/i.test(s.extra))add('timingcuts','Multiple shots conflicts with a continuous/no-cuts instruction in Extra instructions.','extra');
if(s.timelineMode==='multi'&&s.draft!==null&&/\b(?:no cuts|one continuous take)\b/i.test(text))add('timingdraft','Your edited output still requests a continuous take. Review the edited text or rebuild it.','output');
if(['wan','ltx'].includes(s.model))add('timinggeneric','This generic ComfyUI profile emits timing as prose only. Verify native multi-shot and timing support in your exact model and graph.','model');
if(s.model==='seedance25')add('timingseedance25','Shot order and requested durations are emitted as natural language. Exact Seedance 2.5 timestamp syntax has not been verified.','model');
if(s.model==='wan3'&&s.timelineMode==='multi'&&s.beats.some(b=>b.end-b.start<2||b.end-b.start>5))add('timingwan3','Wan 3.0 guidance recommends segments of about 2–5 seconds. Review unusually short or long shots.');
return w;
}
function handoff(s){
if(!active(s))return null;
const notes=[];if(s.model==='marketingVideo')notes.push('Marketing Studio: this is requested action pacing, not a native cut timeline. Select the format, duration, Product and Avatar separately.');
if(s.timelineMode==='multi'){
if(s.model==='wan26')notes.push('Alibaba Cloud Wan 2.6: set shot_type to multi and prompt_extend to true. These API settings are not enabled by this text.');
if(s.model==='kling3')notes.push('Enable Multi-Shot and Custom Multi-Shot in the destination. Enter each shot’s text and duration in its shot controls. On a compatible provider route, multi_shots and multi_prompt are separate settings; copying this text alone does not set them.');
if(s.model==='wan3')notes.push('Use the numbered timestamp prompt in a Wan 3.0 generation workflow. Select the destination duration separately.');
if(['seedance','seedance25'].includes(s.model))notes.push('Shot numbers define sequence; durations are requested pacing, not guaranteed cut times. Set total duration in your generation app.');
if(s.model==='h3')notes.push('The first H3 shot is untimed; later shots begin with increasing cut timestamps. This adapts the base shot/cut structure; specialized speaker and reference-task formats still need review.');
}
if(s.videoTask==='extend')notes.push('All ranges are relative to the new extension. Per-segment camera/framing selections are not emitted; the source camera trajectory is preserved.');
notes.push('Timing is a generation instruction, not a frame-accurate edit. Ranges are kept as entered; review any gaps, overlaps or duration warnings.');
if(s.draft!==null)notes.push('This is the builder plan. Your manually edited prompt is unchanged until you rebuild.');
return {notes,source:sources[s.model],rows:s.beats.map((b,i)=>({label:(s.timelineMode==='multi'?'Shot ':'Segment ')+(i+1),range:seconds(b.start)+'–'+seconds(b.end)+'s',duration:seconds(b.end-b.start)+'s'}))};
}
root.SPTiming={active,make,fit,initialize,compose,warnings,handoff,sources};
if(typeof module!=='undefined')module.exports=root.SPTiming;
})(typeof window==='undefined'?globalThis:window);
