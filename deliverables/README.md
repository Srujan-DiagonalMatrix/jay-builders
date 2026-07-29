# Binary deliverables

Binary files are intentionally not committed to this repository. This keeps the
change reviewable in systems that do not accept binary diffs.

Run `npm run assets:build` to create the generated PNG masters and responsive
AVIF/WebP variants. The command requires PHP with GD, `libwebp`, and `avifenc`.
It never reads or optimizes the supplied reference PNGs.

Run `npm run deliverables:build` to create:

- `deliverables/jay-builders-assets.zip`
- `deliverables/jay-builders-content.zip`

Both archives and all intermediate/generated binary folders are ignored by Git.
The checked-in JSON manifests remain the reviewable source-to-production map.
