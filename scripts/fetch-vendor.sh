#!/usr/bin/env bash
# Downloads third-party files so the site serves everything itself (PRD: self-hosted Three.js).
# Run once from the repository root: bash scripts/fetch-vendor.sh
set -euo pipefail
mkdir -p vendor
curl -fsSL "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" -o vendor/three.min.js
echo "vendor/three.min.js: $(wc -c < vendor/three.min.js) bytes"
