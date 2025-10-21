#!/bin/bash
# Download scenic image into public/assets/dashboard-bg.jpg
IMG_URL="https://images.pexels.com/photos/34950/pexels-photo.jpg"
DEST="public/assets/dashboard-bg.jpg"
mkdir -p "$(dirname "$DEST")"
curl -L "$IMG_URL" -o "$DEST" && echo "Saved $DEST" || echo "Failed — download manually"
