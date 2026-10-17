(function(root){
'use strict';
function active(s){return s.type==='image'&&s.task==='edit'||s.type==='video'&&s.videoTask!=='new';}
function mode(s){return s.type==='image'?'image':s.videoTask;}
const presets={
background:{name:'Replace the background',modes:['image','edit'],change:'Replace the background with a quiet sunlit courtyard. Blend the subject edges and contact shadows into the new setting.',keep:'Keep the subject identity, hairstyle, clothing, pose, proportions and original framing.'},
outfit:{name:'Change an outfit',modes:['image','edit'],change:'Replace the subject’s clothing with a plain navy jacket over a white shirt. Fit the garments naturally to the existing body and pose.',keep:'Keep the subject identity, face, hairstyle, body proportions, pose, background and original framing.'},
remove:{name:'Remove an object',modes:['image','edit'],change:'Remove the cup from the table. Reconstruct the surface behind it with matching texture, perspective and lighting.',keep:'Keep all other objects, people, clothing, background and original framing.'},
continue:{name:'Continue the action',modes:['extend'],action:'Continue the subject’s current movement naturally from the final frame, then let the action settle without repeating the preceding motion.'},
reveal:{name:'Continue a reveal',modes:['extend'],action:'Continue the established camera trajectory from the final frame, revealing more of the existing surroundings without a cut or sudden change in speed.'}
};
function available(s){return active(s)?Object.entries(presets).filter(([,p])=>p.modes.includes(mode(s))):[];}
function apply(s,id){const p=presets[id];if(!p||!available(s).some(([key])=>key===id))throw Error('This starting point does not match the current editing mode.');return root.SP.validate({...s,...(p.action?{action:p.action,timelineMode:'off'}:{editChange:p.change,editKeep:p.keep})});}
function summary(s){if(!active(s))return null;const kind=s.type==='image'?'image':'video',sources=s.refs.map((r,i)=>({r,i})).filter(({r})=>r.kind===kind),first=sources[0];
return {operation:s.type==='image'?'Image edit':s.videoTask==='edit'?'Video edit':'Forward video extension',source:first?root.SP.refName(s,first.i)+(first.r.name.trim()?' · '+first.r.name.trim():''):null,multiple:kind==='video'&&sources.length>1,change:s.videoTask==='extend'&&s.type==='video'?s.action:s.editChange,keep:s.videoTask==='extend'&&s.type==='video'?'Identity, clothing, setting, lighting, camera trajectory and established sound at the continuation boundary.':s.editKeep,inherit:s.type==='image'?'Original dimensions and aspect ratio are requested. Confirm sizing in the destination editor.':s.videoTask==='edit'?'Source duration, aspect ratio, camera motion and sound are preserved unless explicitly changed.':'Extend forward for '+s.duration+' seconds; inherit the source aspect ratio and continue from its final frame.',manual:s.draft!==null};
}
root.SPEdit={active,mode,presets,available,apply,summary};
if(typeof module!=='undefined')module.exports=root.SPEdit;
})(typeof window==='undefined'?globalThis:window);
