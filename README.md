# ShotPrompt 2.9.0

ShotPrompt focuses on image, video and character-sheet prompt building.

## Included
- Visual image framing, light and style choices; image editing with separate change/preserve instructions.
- New video, Seedance 2.5 edits and forward extensions; camera movement independent of subject action.
- Character sheets with None slots, exact cell geometry and separate-view prompts.
- Current model choices, role-based references and Element tokens, contradiction checks and editable output.
- Simple/Advanced controls with highlighted contributions; matched Save/Open controls; browser-local save and JSON transfer.
- Original image/video workspaces in All tools & models, including their specialized model options and saved-character/prompt tools.

## Scope change
Script and Storyboard have been removed from the live UI, tool library, composer and downloadable project state. Their source is preserved outside the hosted public directory for a separate future product. Original image/video workspace navigation has been updated to remove the retired links. The unchanged original v1.14.0 archive remains available to the owner.

Existing image/video/character projects remain compatible with version-2 JSON. Obsolete writing fields are ignored when opening a supported project. An older writing project cannot replace the active project: importing it shows a clear explanation. If an older autosave contains writing data, even while its active tab is Image or Video, its original combined JSON is backed up locally and a download is offered before normal ShotPrompt use. Browser storage cannot sync across devices or recover data cleared by the browser.

## Hosting and limits
Hosted at https://dream-prompt-workbench.higgsfield.app. Unlisted from the community feed; accessible to anyone with the link. No sign-in, generation, media uploads or cross-device sync. Map references here and attach the actual files in your destination app. Use Save project/Open project to move projects between devices.

Model adapters emit instructions, not ComfyUI graphs or generation requests. Generic Wan/LTX and inherited MiniMax H3 formats remain labeled with their limits. Grid instructions do not guarantee generated layout. No image/video generation quality test was run.

## Next step
Improve and test the focused image/video workflow: reference ordering, model-specific edit preservation, camera behavior and phone usability. Do not reintroduce writing or storyboard tools into ShotPrompt; those belong to a separate future product.

## Reliability update
Reference roles now state what is copied and what is excluded. Reference order can be changed with Earlier/Later controls; image-edit targets are visibly marked. Image and video numbering remain independent, and Elements do not consume numbered upload slots. Match this order in the destination app; ShotPrompt does not bind or upload media.

Checks now include plain Image N and Video N mentions, conflicting edit-change/preservation instructions, and speech versus silence. Camera checks avoid treating ordinary subjects such as a cooking pan as camera motion. These remain English heuristics, not semantic or generation-quality guarantees. Separate portrait prompts no longer refer to multi-panel cells.

### Interface update 2.9.0
On phones, use the fixed View prompt / Copy prompt shortcuts and Back to builder. Reference cards fold to a mapping, name and role summary; open a card to edit it. Existing prompt composers are unchanged.

### Creative expansion 2.9.0
Eight starting categories: Anything, People, Landscape, Product, Architecture, Food, Abstract and VFX shot. Category details are used only while their category is active. Ten looks include photoreal, commercial, documentary, analog film, anime and stylized 3D. Schematic visual samples are drawn interface illustrations, not generated examples.

New-video camera choices: locked, dolly in/out, pan, tracking, orbit, tilt, crane, handheld and optical zoom. Simple shows six; Advanced reveals all ten, movement speed and applicable directions. Advanced also adds camera angle, lens feel, depth of field and composition.

VFX choices: None, smoke/mist, sparks, particles, energy glow, debris and transformation. Advanced adds intensity and video timing. These controls produce text directions, not actual effects, generation APIs, model presets or ComfyUI node graphs. Existing model profiles and limits are unchanged.

Creative settings remain saved when hidden in Simple mode and are summarized beside the prompt. They are not emitted for source editing, extension or character sheets. Existing sheet layouts retain their neutral lighting and identity rules. Extra instructions remain available for explicit source edits. Manual output remains pinned until rebuilt.

Checks now flag macro/wide framing, selected effects versus exclusion text, transformation missing detail, and zoom/fixed lens interpretation. Checks remain basic English heuristics. Generated results have not been independently tested for every new combination.

### Guided starts and visual guide 2.9.0
Open Start with a guided preset for Product hero, Landscape reveal, Natural portrait, Food close-up or VFX action. Preview lists the settings that will change before applying. Presets reset scene-specific creative fields, while preserving references, destination model, ratio, duration, extra instructions, exclusions and manually edited output. New-image and new-video builders only. Movement, subject action and sound affect new videos. Undo preset is available until the next builder or output edit; opening a guide or preview does not consume it. Undo is a session convenience, not saved project history.

See what these choices mean contains labeled diagrams and explanations for framing, lens field of view, dolly/pan/zoom and smoke/sparks/energy effects. These are schematic educational illustrations, not generated samples or a live simulation of the output. Lens explanation distinguishes focal length from perspective changes caused by camera distance.

Night practical lighting is available and used for the night VFX starting point. No generated media, sign-in or model API changes. Stronger semantic conflict checks, destination-specific capability guidance, and further editing-workflow redesign remain future work.

### Review and destination guidance 2.9.0
Prompt review distinguishes saved-builder checks from checks on manually edited output. New rules flag possible daylight/night, framing, angle, focus and movement-direction mismatches; specific movement exclusions; requested-versus-Avoid terms; duplicate named identity mappings; identity-changing edits; contradictory camera instructions in manual text; and manual sheet-count mismatches. Review buttons navigate to the relevant control, revealing Advanced where needed, without changing the prompt. The old broad effect exclusion was narrowed so “no smoke” does not conflict with selected sparks.

Checks use English text patterns and can miss intent or produce false positives. They do not inspect uploaded images. Builder checks may differ from a manually revised prompt; edited output remains pinned until explicitly rebuilt. No automatic corrections or generation gates were added.

How to use this prompt separates emitted instructions from required destination setup: model, reference attachments, aspect ratio, duration, audio, resolution/quality, and ComfyUI graph connections. Source-video edits inherit source duration and ratio; forward extension follows source ratio. Unversioned GPT Image and generic ComfyUI profiles are explicitly labeled. Model capability does not imply that this builder maps every feature: video-reference mapping remains limited here to Seedance 2.5.

Higgsfield catalog facts are a saved read-only snapshot checked 16 October 2026, not a live connection. Only supported-profile facts were saved; no account, plan, pricing or balance data. Current catalog ratios include 21:9 for Seedream Lite; the builder still offers a smaller ratio selection. H3 duration is reviewed against the catalog, while its inherited prompt syntax remains unverified.

Official workflow sources checked 16 October 2026:
- Qwen Image 2.1 template, reference slots and CFG behavior: https://docs.comfy.org/tutorials/image/qwen/qwen-image-2-1
- FLUX.2 native negative-prompt support: https://help.bfl.ai/articles/7734566352-does-flux-2-support-negative-prompting

No sign-in, generation, or community listing added. A complete model catalog expansion, image-content analysis, and semantic AI review are not implemented.

### Editing workflow 2.9.0
For image edits, video edits and forward extensions, source mapping now appears before instructions. Image edits identify the first uploaded image as the target. Video operations ask for exactly one mapped source video. ShotPrompt does not upload media or edit pixels.

Change and Keep cards separate requested modifications from preserved details. Editable starting examples cover background replacement, outfit change and object removal; continuation examples cover action continuation and a continued camera reveal. Native preview shows the replacement text before applying. Examples do not analyze the source. They change only Change/Keep or continuation action, preserving references, model, output settings, extra instructions and manual output. Existing session Undo remains available until the next builder/output edit.

Before you copy summarizes the operation, mapped source, Change/Next action, Keep and inherited sizing/timing behavior. It updates with builder changes and labels itself as builder-only when output is manually edited. Review source/instructions buttons navigate without modifying the text. Missing/duplicate source warnings remain nonblocking.

No AI chat, local bridge, generation service, sign-in, or Script/Storyboard functionality added. Advanced specialized original image/video tools remain available. Full end-to-end usability audit and current-version download packaging remain next.

### Video Timing & shots 2.9.0
Whole clip preserves the previous single-take behavior. Timed continuous schedules actions and camera changes within one uncut clip. Multiple shots schedules shot descriptions, framing, camera movement and entry transitions. Advanced exposes each segment’s movement speed/direction. Global look, light, lens/focus/composition, dialogue and effects remain shared. The hidden whole-clip action and global framing/movement are not emitted while a timing plan is active.

Add/remove/reorder segments (up to 12). Ranges are kept as entered. Fit to duration explicitly redistributes them evenly while preserving descriptions. Checks cover gaps/overlaps, non-increasing/endless ranges, clip boundaries, missing actions, camera contradictions and no-cuts wording. Plans save in existing version-2 projects with backward-compatible defaults. Manual output remains pinned.

Forward extensions support timed continuous actions relative to the NEW portion; per-segment camera/framing is omitted to preserve the source camera trajectory. Saved multi-shot plans are not emitted in source-edit or extension mode. Editing and creative starting presets switch to Whole clip when needed and retain stored segments; preview shows the change.

Model routes:
- MiniMax H3 timed multi-shot adapts its base guide: untimed Shot 1, later increasing millisecond cut timestamps. Specialized speaker/reference-task syntax is not fully automated; untimed legacy output remains preserved.
- Seedance 2.0/2.5 use numbered shots and requested durations. Exact Seedance 2.5 timestamp syntax has not been verified; durations guide pacing.
- Added Kling 3.0 Omni / Higgsfield: numbered descriptions and per-shot durations, with explicit separate Custom Multi-Shot setup instructions. This is prompt text, not an API payload or automatic switch.
- Added Wan 2.6 / Alibaba Cloud: multi-shot requires shot_type=multi plus prompt_extend=true in the destination; this differs from Higgsfield/local routes.
- Added Wan 3.0 / Higgsfield: numbered start/end ranges; about 2–5 seconds per shot is guidance, not a hard validator.
- Generic Wan and LTX ComfyUI profiles remain available. Timing is prose; native support depends on the exact graph/model.

Total model limits for new Kling/Wan3 profiles were checked against the read-only Higgsfield catalog on 16 October 2026. No calls are made to generation APIs. ShotPrompt does not produce frame-accurate cuts, toggle destination settings, edit footage or guarantee timing adherence.

Official timing sources:
- https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md
- https://seed.bytedance.com/en/blog/seedance-2-0-official-launch
- https://kling.ai/quickstart/klingai-video-3-model-user-guide
- https://www.alibabacloud.com/help/en/model-studio/legacy-wan-text-to-video-api-reference
- https://help.aliyun.com/en/model-studio/wan3-video-generation-prompt-guide

No Script/Storyboard feature, AI chat, sign-in, media generation or community listing was added.

### Composition, conversation and rendering 2.9.0
Composition & conversation offers OTS over A toward B, reverse OTS, two-shots, singles, reactions and character POV. Name Person A/B to match your reference labels; framing instructions do not bind identity references automatically. Images request one selected view, not a multi-panel sheet. Videos can assign coverage, angle and composition per timed shot, inheriting global defaults where requested. Speaker selection maps entered dialogue to A or B; choosing a speaker alone does not invent spoken words.

Advanced composition controls include optional conversation-axis/eyeline continuity, headroom, looking room, depth layering, and coverage-cut guidance (including deliberate jump cuts). These are prompt directions, not geometry enforcement. Intentional rule breaking remains available. POV/angle, duplicate-label and solitary-scene/conversation mismatches receive review notes.

New camera viewpoints: extreme low, tabletop, ceiling-corner and Dutch angle. Composition options include extreme off-center, foreground obstruction, frame-within-frame and strong diagonals. Previewable, undoable examples expose the ingredients of clear conversation coverage and unconventional wide-angle/foreground staging; no named-film reproduction is promised.

Rendering detail is separate from broad look and scene VFX: realistic CG, cel-shaded/toon 3D, painterly 3D, clay, miniature/diorama, low-poly, retro game, watercolor, ink, printed halftone and cut-paper collage. Specific media replace conflicting photography wording while retaining broad art direction. Optional finishes include paper grain, brush texture, graphic outlines and film grain. UI samples are schematic illustrations, not generated examples.

Image/video editing, source extensions and neutral character sheets keep their existing preservation behavior: new creative controls do not leak into those operations. Existing project JSON migrates with defaults; old timed segments inherit cinematic choices. Manual output is pinned until explicitly rebuilt. Reference identity/style/composition roles remain separate.

Background sources:
- OTS/eyeline/axis continuity: https://www.adobe.com/uk/creativecloud/video/production/cinematography/camera-shots-and-angles/over-the-shoulder-shot.html
- Wide-angle/small-camera composition context in the Shin Ultraman director interview: https://www.pen-online.jp/article/010553.html
- Rendering includes photoreal and non-photoreal treatments: https://www.blender.org/features/rendering/

No image/video generation, AI chat, sign-in or community listing added. These controls guide generation; adherence and continuity require checking actual results.

## 2.8.0 — Content formats

Choose “What is this for?” within Image or Video. Images support creator stills, TikTok/social still concepts, product shots, ads, posters and marketplace layouts. Videos support UGC, TikTok/social, product motion and ads. These are original editable brief recipes, not hidden Higgsfield preset prompts.

Preview a starting example before applying it. The example preserves references, product brief, destination, extra instructions and manual output. It resets the shown scene/camera/style choices and parks timed plans (the before/after example creates two shots). Review retained extra instructions for conflicts. Undo is available until the next edit.

Marketing Studio Image/Video are new destination profiles. The setup guide identifies a suggested native video mode and explains separate Product/Avatar selections, duration, ratio, resolution and audio settings. Text does not bind assets or enable destination controls. Native mode names and 12–15-second video range were checked against the read-only catalog on 16 October 2026. Older gallery examples may have different settings.

Completed: format variations; optional product/setting/message fields; exact headline/CTA; supplied marketplace measurements/callouts; explicit before/after states; saved-project migration; reference-slot guide; missing-input checks; preview/apply/undo; protected editable output.

Not implemented: generation, sign-in, automatic asset binding, fetching product pages, direct export to Marketing Studio, final typography correction, marketplace compliance verification, or AI chat. No Script or Storyboard builder.

Official guidance:
- https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-marketing-studio-to-create-video-ads
- https://higgsfield.ai/academy/courses/brand-visuals-ai/marketing-studio-try-ons

### Standalone backup
Download `shotprompt-2.9.0.zip`, extract it, then open `index.html` or serve the folder with any static web host. The current prompt builder needs no server or account; copy/download availability can depend on browser permissions. Preview images stay local and must be reattached after opening a project. 

## 2.9.0 — Visual picker and workflow

Illustrated format cards replace the primary dropdown flow. Choose a content family, then a relevant variation. List selectors remain available. These are schematic guides, not generated or copied sample media. Cards add format guidance; only preview/apply replaces scene settings.

Content → References → Look & camera → Prompt provides step navigation. Sections can be opened independently, or use Show all for the complete form. Source edits and character sheets use the same structure with appropriate controls. Review links reveal their target section, Advanced opens its extra controls, and manual output stays protected. Open optional brief/list sections are retained while editing in this session; projects store content choices and prompt data, not navigation state.

Completed in this update: visual family and variation picker, mobile step navigation, expandable form sections, review navigation, full-form option, local standalone backup. Planned separately: deeper content-specific contradiction checks and richer real-media examples. No generation, account connection or AI chat was added.

## GitHub Pages migration — 17 October 2026

This is the complete static ShotPrompt 2.9.0 builder. It runs independently of Higgsfield hosting. Higgsfield remains a destination for prompts, not a runtime dependency. The current deployment contains only the new builder; retired workspace URLs redirect to it.

Publish from the `main` branch and `/(root)` in Settings → Pages. `.nojekyll` keeps the source as plain static files. Future commits to this branch deploy automatically after Pages is enabled. No installation, server, API key, sign-in or media generation is required by the builder.

The site retains noindex/nofollow. This discourages indexing, but does not make a public website or public repository private. Browser saves are scoped to the site address: export projects from the old host and import them here. Reference previews must be reattached locally.

## 2.9.1 — Current builder only

Removed original workspace links, old hosted-studio access and legacy application code from the deployed pages and current download. Old workspace URLs redirect to the current builder. Image, Video, Character sheet, editing and current model profiles are retained. Original offline archives remain untouched.
