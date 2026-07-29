#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
command -v zip >/dev/null || { echo "Missing required packaging tool: zip" >&2; exit 1; }

test -d assets-source/generated-masters || npm run assets:build
mkdir -p deliverables
rm -f deliverables/jay-builders-assets.zip deliverables/jay-builders-content.zip
zip -qr deliverables/jay-builders-assets.zip \
  assets-source/generated-masters public/assets/images public/assets/icons \
  deliverables/manifests/asset-manifest.json
zip -qr deliverables/jay-builders-content.zip \
  requirements/content src/content deliverables/manifests/content-manifest.json

echo "Created deliverables/jay-builders-assets.zip and deliverables/jay-builders-content.zip."
