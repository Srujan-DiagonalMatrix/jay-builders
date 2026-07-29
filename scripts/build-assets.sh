#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

for command in php python avifenc; do
  command -v "$command" >/dev/null || {
    echo "Missing required asset tool: $command" >&2
    exit 1
  }
done

rm -rf assets-source/generated-masters public/assets/images
php scripts/generate-assets.php

# AVIF is encoded while the generated PNG renditions still exist. The WebP
# encoder then consumes and removes the intermediate PNG/PPM renditions.
for png in public/assets/images/*.png; do
  avifenc --quiet --min 22 --max 32 "$png" "${png%.png}.avif"
done
python scripts/encode-webp.py

echo "Generated 22 PNG masters and 132 responsive production variants."
