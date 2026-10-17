(function(root){
'use strict';
const SP=root.SP;
const modelIds={seedream:'seedream_v5_pro',seedream45:'seedream_v4_5',seedreamLite:'seedream_v5_lite',nano:'nano_banana_2_1',seedance:'seedance_2_0',seedance25:'seedance_2_5',h3:'minimax_h3',kling3:'kling_o3_image_reference',wan3:'wan3_0'};
function positive(text){return String(text||'').replace(/\b(?:no|without|avoid|do not|don't|not)\s+[^.!?;\n,]+/gi,part=>{const split=part.search(/\b(?:but|however|while)\b/i);return split<0?'':part.slice(split);});}
function activeText(s){const fields=SP.isCreative(s)?['idea',...(SP.categoryFields[s.category]||[]).map(x=>x[0]),...(s.type==='video'&&!root.SPTiming?.active(s)?['action']:[]),'extra']:s.type==='sheet'?['sheetIdea','extra']:s.type==='video'&&s.videoTask==='extend'?['action','extra']:['editChange','extra'];return fields.map(k=>s[k]).concat(root.SPTiming?.active(s)?s.beats.map(b=>b.action):[]).join('\n');}
function collect(s,text){const result=SP.warnings(s,text).filter(x=>!root.SPTiming?.active(s)||!['lensconflict','camera'].includes(x.code)).map(x=>({...x,scope:s.draft!==null&&['unmapped','unmappedvideo'].includes(x.code)?'output':'builder'}));const add=(code,message,field,evidence,scope='builder')=>{if(!result.some(x=>x.code===code))result.push({code,message,field,evidence,scope});};
const raw=activeText(s),pos=positive(raw),match=re=>pos.match(re)?.[0];
if(SP.isCreative(s)){
const night=match(/\b(?:at night|midnight|nighttime|night-time|after dark)\b/i),day=match(/\b(?:in daylight|broad daylight|midday sun|at noon|sunlit|sunrise|sunset)\b/i);
if(night&&['warm','soft','day'].includes(s.light))add('lighting','The scene describes night, while the light choice asks for daylight. Review which time of day you intend.','light',night);
if(day&&s.light==='night')add('lighting','Night lighting may conflict with the daylight described in your scene.','light',day);
const above=match(/\b(?:straight overhead|directly overhead|top-down view|bird.s.eye view)\b/i),below=match(/\b(?:low.angle|ground.level camera|camera looking upward)\b/i);
if(!root.SPTiming?.active(s)&&(above&&['low','ground','extremelow'].includes(s.angle)||below&&['overhead','high','ceiling'].includes(s.angle)))add('angleconflict','The camera angle and the written viewpoint may disagree.','angle',above||below);
const deep=match(/\b(?:everything (?:is |stays )?sharp|deep depth of field|sharp background|sharp from foreground to background)\b/i),shallow=match(/\b(?:shallow depth of field|blurred background|soft background|background bokeh)\b/i);
if(s.focus==='shallow'&&deep||s.focus==='deep'&&shallow)add('focusconflict','Your depth-of-field choice and the written background focus may disagree.','focus',s.focus==='shallow'?deep:shallow);
const full=match(/\b(?:head.to.toe|full.body|entire body)\b/i),tight=match(/\b(?:face fills (?:the )?frame|extreme close.up)\b/i);
if(!root.SPTiming?.active(s)&&(['close','detail'].includes(s.shot)&&full||s.shot==='wide'&&tight))add('framingconflict','The framing selection may crop differently from your written request.','shot',full||tight);
if(s.type==='video'&&!root.SPTiming?.active(s)){
const opposite={pan:s.direction==='left'?/\b(?:camera pans? right|pan to the right)\b/i:/\b(?:camera pans? left|pan to the left)\b/i,tilt:s.direction==='down'?/\b(?:camera tilts? up|tilt upward)\b/i:/\b(?:camera tilts? down|tilt downward)\b/i,zoom:s.direction==='out'?/\b(?:camera zooms? in|zoom in)\b/i:/\b(?:camera zooms? out|zoom out)\b/i,orbit:s.direction==='counter'?/\bclockwise orbit\b/i:/\bcounterclockwise orbit\b/i}[s.move];
if(opposite&&match(opposite))add('directionconflict','The selected camera direction differs from the written movement.','direction',match(opposite));
const prohibited={push:/\b(?:no|without|avoid)\s+(?:any\s+)?(?:dolly|camera movement)\b/i,pull:/\b(?:no|without|avoid)\s+(?:any\s+)?(?:dolly|camera movement)\b/i,zoom:/\b(?:no|without|avoid)\s+(?:any\s+)?zoom(?:ing)?\b/i,pan:/\b(?:no|without|avoid)\s+(?:any\s+)?pan(?:ning)?\b/i,orbit:/\b(?:no|without|avoid)\s+(?:any\s+)?orbit(?:ing)?\b/i,tilt:/\b(?:no|without|avoid)\s+(?:any\s+)?tilt(?:ing)?\b/i,handheld:/\b(?:no|without|avoid)\s+(?:any\s+)?handheld\b/i}[s.move];
if(prohibited&&raw.match(prohibited))add('motionexcluded','The selected camera move is excluded by your wording.','move',raw.match(prohibited)[0]);
}
if(!['flux','qwen'].includes(s.model)&&s.negative.trim()){
const negatives=s.negative.split(/[,;\n]/).map(v=>v.trim().toLowerCase().replace(/^(?:no|without|avoid)\s+/,'')).filter(v=>/^(?:smoke|sparks|particles|logos?|text overlays?|people|person|rain|snow|wings)$/.test(v));
for(const word of negatives){const escaped=word.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&');const hit=pos.match(new RegExp('\\b'+escaped+'\\b','i'));if(hit){add('avoidconflict','Your description requests something also listed in Avoid. Review whether it belongs in the scene.','negative',hit[0]);break;}}
}
}
const named=new Map();for(const r of s.refs.filter(r=>r.role==='identity'&&r.name.trim())){const name=r.name.trim().toLowerCase();if(named.has(name))add('identityoverlap','Multiple identity references name the same subject. Check whether they are alternate views of one identity or competing identities.','refs',r.name.trim());named.set(name,true);}
if(s.type==='image'&&s.task==='edit'||s.type==='video'&&s.videoTask==='edit'){
const changes=positive(s.editChange).replace(/\b(?:keep|preserve|retain)\b[^.!?;\n]*/gi,'');if(s.refs.some(r=>r.role==='identity')&&/\b(?:change|replace|remove|shave|dye|shorten)\b[^.!?;\n]*\b(?:hair|hairstyle|face|facial proportions)\b/i.test(changes))add('identityedit','An identity reference asks to preserve face and hair, while the edit changes one of those features. Clarify which identity properties may change in Extra instructions.','extra',changes.match(/\b(?:change|replace|remove|shave|dye|shorten)\b[^.!?;\n]*/i)?.[0]);
}
if(s.draft!==null){
const output=String(text),op=positive(output);
if(!root.SPTiming?.active(s)&&/\b(?:locked.off(?: tripod)? camera|static camera|camera (?:stays|remains) still)\b/i.test(op)&&/\b(?:camera (?:pans|tilts|zooms|orbits|dollies)|dolly (?:in|out)|tracking shot)\b/i.test(op))add('outputcamera','The edited prompt contains both a still-camera instruction and a moving-camera instruction.','output','Review the edited text; rebuilding is optional.','output');
if(s.type==='sheet'&&s.sheetOutput==='grid'){const count=output.match(/\bexactly\s+(\d+)\s+(?:equal\s+)?(?:panels|cells|views)\b/i);if(count&&+count[1]!==SP.activeViews(s).length)add('outputpanels','The edited prompt names a different panel count from the builder preview.','output',count[0],'output');}
}
const ids=modelIds[s.model],data=(root.SPModelData||[]).find(x=>x.id===ids);
if(data&&!(s.type==='image'&&s.task==='edit')&&!(s.type==='video'&&s.videoTask!=='new')&&!data.ratios.includes(s.ratio)&&!result.some(x=>x.code==='ratio'))add('modelratio','This aspect ratio is not listed for the selected model profile. Choose a listed ratio or review the destination app.','ratio',s.ratio);
if(data?.duration&&s.type==='video'&&s.videoTask!=='edit'&&(s.duration<data.duration.min||s.duration>data.duration.max)&&!result.some(x=>x.code==='duration'))add('duration','The catalog lists '+data.duration.min+'–'+data.duration.max+' seconds for this model.','duration',s.duration+' seconds');
return result;
}
const locations={idea:'idea',edit:'editChange',base:'refs',sourcevideo:'refs',views:'views',emptyviews:'views',camera:'move',duration:'duration',speech:'dialogue',elements:'refs',token:'refs',workflow:'model',ratio:'ratio',refs:'refs',negative:'negative',unmapped:'refs',unmappedvideo:'refs',editconflict:'editChange',audio:'audio',elementsource:'refs',sheetidentity:'refs',layout:'refs',effectconflict:'effect',lensconflict:'lens',effectdetail:'effectNotes',zoomlens:'lens',composition:'composition',videoref:'model',editmodel:'model'};
function destination(s){
const p=SP.profiles[s.model],data=(root.SPModelData||[]).find(x=>x.id===modelIds[s.model]),video=s.type==='video',source=video&&s.videoTask!=='new',edit=s.type==='image'&&s.task==='edit',comfy=['qwen','flux','wan','ltx'].includes(s.model);
const sent=[s.type==='sheet'?'Character identity, requested views and panel layout.':source||edit?'Requested changes and preservation instructions.':'Scene, look, framing, lighting and selected camera/VFX directions.', 'Reference labels and role instructions; the actual media must be attached separately.'];
if(video&&!source)sent.push('Subject action, requested duration, audio description and dialogue.');
const alibaba=p.destination==='alibaba';const separate=[alibaba?'Select the exact Wan 2.6 model and generation endpoint in Alibaba Cloud.':comfy?'Load the exact model and workflow in ComfyUI.':'Select the matching model in your generation app.'];
if(source){separate.push(s.videoTask==='edit'?'Select video_edit mode. Duration and aspect ratio come from the source video.':'Select video_extension mode and forward extension. Aspect ratio follows the source; set extension duration to '+s.duration+' seconds.');}
else if(edit)separate.push('Open the destination image-edit workflow and attach the base image first. Original dimensions are requested in the text; confirm output sizing in that workflow.');
else separate.push('Set output aspect ratio to '+s.ratio+'.'+(video?' Set duration to '+s.duration+' seconds.':''));
if(!comfy&&s.model==='seedance25'&&!source)separate.push(s.refs.length?'Select omni_reference mode and attach your references.':'Select t2v mode for a prompt-only clip.');
if(video)separate.push(comfy?'Check whether the installed video workflow can generate sound; written audio directions do not add an audio node.':(alibaba?'Set audio options in the selected Alibaba Cloud endpoint; written directions do not set API parameters.':'Choose the audio setting in your generation app; written audio directions do not switch it on or off.'));
separate.push(comfy?'Set output size, sampler and other workflow settings separately. Numbered text does not connect image nodes.':(alibaba?'Set size/resolution in Alibaba Cloud; ShotPrompt does not set API parameters.':'Choose resolution/quality in your generation app; ShotPrompt does not set them.'));
const notes=[];if(alibaba)notes.push('Alibaba Cloud route: limits and multi-shot settings differ from your generation app and local ComfyUI. Attach image/video media only in an endpoint that explicitly supports those inputs.');if(root.SPTiming?.active(s)){const t=root.SPTiming.handoff(s);notes.push(...t.notes);sent.push('The timed segment plan replaces the hidden whole-clip action and global camera/framing controls.');}
if(s.model==='qwen'){notes.push('This composer follows the official Qwen Image 2.1 edit template: first image is <image1>; this profile maps the first ten wired image slots. The encoder can expose more slots in other graphs.');notes.push('Avoid text is omitted for the template’s CFG 1 path. A different CFG or graph can behave differently.');}
if(s.model==='flux')notes.push('Generic FLUX.2 prose profile. Native FLUX.2 has no negative prompt; use positive descriptions. Reference connections depend on your graph.');
if(['wan','ltx'].includes(s.model))notes.push('Generic ComfyUI profile: no exact model version, audio capability or duration limit has been verified for your installed graph.');
if(s.model==='gpt')notes.push('This is an unversioned GPT Image prose profile. Confirm your exact GPT Image variant and its options in your generation app; no variant-specific limits are enforced here.');
if(s.model==='h3')notes.push('Untimed output retains the inherited H3 format. Timing & shots adapts the documented base shot/cut structure; specialized speaker and reference-task syntax is not fully automated.');
if(s.model==='seedance')notes.push('The model catalog lists video references, but this builder maps source-video workflows only under Seedance 2.5. Switch there to use this builder’s video-reference mapping.');
if(!SP.isCreative(s))notes.push('New-scene category, lens, camera and VFX selections are not added to this operation. Use the edit/continuation instructions for intentional changes.');
if(s.negative.trim()&&!['flux','qwen'].includes(s.model))notes.push('Avoid is included as an instruction in the main prompt. It is not a separate negative-conditioning field.');
if(s.refs.some(r=>r.kind==='element'))notes.push('Bind Elements in your generation app using their exact mentions. Typing a token here does not bind or upload an Element.');
if(s.draft!==null)notes.push('Your edited output is kept. This setup guide describes the builder choices; confirm the edited text agrees with them.');
const facts=data?{model:data.name,ratios:data.ratios.filter(x=>x!=='auto').join(', '),duration:data.duration?data.duration.min+'–'+data.duration.max+' seconds':null,options:Object.entries(data.options).filter(([key])=>['resolution','quality'].includes(key)).map(([key,values])=>key+': '+values.join(', '))}:null;
return {sent,separate,notes,facts,alibaba,checked:data?'Catalog checked 16 October 2026. This is a saved snapshot, not a live capability check.':'Workflow-specific guidance; limits depend on the selected variant or graph.',comfy};
}
root.SPReview={collect,destination,locations,positive};
if(typeof module!=='undefined')module.exports=root.SPReview;
})(typeof window==='undefined'?globalThis:window);
