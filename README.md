# ShotPrompt 2.10.0

Current builder for image, video and character-sheet prompts. Model labels use model names without hosting brands. Product shots includes listing views, details, lifestyle placement and supplied dimensions/callouts. Ads handles commercial messages and calls to action. Saved Marketplace projects migrate to Product shots, preserving brief fields.

The builder prepares editable prompt text; attach media and configure settings in your generation app. Model profiles retain workflow-specific syntax and capability notes; a general label does not make provider-specific features universal. Projects and previews stay in this browser. Use Save/Open to transfer JSON and reattach preview images.

Hosted at https://crystyles14.github.io/shotprompt/. No generation, sign-in, or cross-device sync. Original offline archives remain untouched.

## 2.10.0 — Combined workflow update

- My presets: save up to 50 local looks, camera setups or product/content briefs. Preview changed fields before applying; references, scene, model, duration, ratio and manual output are preserved. Brief presets replace their named brief fields. Undo is available until newer edits, and local removal can be undone until the next library change. Export/import a validated JSON library for backup and transfer. Presets are separate from project JSON and do not sync.
- Model settings & limits: profile duration guidance, listed-ratio snapshot, source-size inheritance, workflow uncertainty, and text-versus-app setup. Avoid is disabled for profiles that do not emit it, preserving its saved text. Ratios outside the saved snapshot are marked for review, not silently changed or disabled. No native generation settings are toggled.
- Timing: duration-proportional segment buttons, status for range coverage, direct navigation to segments, Earlier/Later reorder and Fit to duration. Reorder retains entered times and can create gaps/overlaps; Fit explicitly redistributes ranges and keeps descriptions. Invalid ranges remain editable and receive review notes. The overview is not a rendered video editor.
- Mobile: safer form typography, wrapped controls, larger touch targets, safe-area spacing, responsive preset dialogs and timeline scrolling. Browser checks at 320px and 390px passed; physical-phone keyboard/touch/safe-area behaviour is not verified here.

Verification: 18 core release checks, script parsing, browser preset save/preview/apply with manual-output preservation, timing reorder/fit and responsive overflow checks.

## Limits

Prompt checks use English heuristics and cannot inspect references or guarantee generation results. Model capability guidance is a saved snapshot, not a live catalog. Workflow-specific syntax, reference mentions and settings must be supported by the destination you choose. Only individual model profiles are listed. Former content-brief profiles migrate to Seedream 5.0 Pro for images or Seedance 2.5 for videos; references, content and manual output remain preserved. Script and Storyboard are not included. No AI chat or automatic generation is implemented.

## Content conflict review

Listing scene/framing/effect mismatches, continuous-take cuts, product transformation and timed camera locks receive nonblocking review notes. Checks use English patterns and cannot inspect reference images or guarantee model adherence.
