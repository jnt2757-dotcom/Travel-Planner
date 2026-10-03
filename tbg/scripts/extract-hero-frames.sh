#!/usr/bin/env bash
# Extract the hero frame sequence from public/hero/build.mp4.
#
#   public/hero/frames/frame_0001.webp …         ~150 frames, 1920px wide (desktop)
#   public/hero/frames-mobile/frame_0001.webp …  ~75 frames, 960px wide (phones)
#   public/hero/final.webp                       last frame, full quality (reduced-motion still)
#
# Usage: npm run hero:frames   (FRAMES=150 MOBILE_FRAMES=75 to override)
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=public/hero/build.mp4
FRAMES=${FRAMES:-150}
MOBILE_FRAMES=${MOBILE_FRAMES:-75}

if [[ ! -f "$SRC" ]]; then
  echo "Missing $SRC — add the build video there first." >&2
  exit 1
fi

DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
fps_for() { awk -v n="$1" -v d="$DURATION" 'BEGIN { printf "%.6f", n / d }'; }

rm -rf public/hero/frames public/hero/frames-mobile
mkdir -p public/hero/frames public/hero/frames-mobile

ffmpeg -loglevel error -i "$SRC" \
  -vf "fps=$(fps_for "$FRAMES"),scale=1920:-2:flags=lanczos" \
  -c:v libwebp -quality 72 -compression_level 6 \
  public/hero/frames/frame_%04d.webp

ffmpeg -loglevel error -i "$SRC" \
  -vf "fps=$(fps_for "$MOBILE_FRAMES"),scale=960:-2:flags=lanczos" \
  -c:v libwebp -quality 68 -compression_level 6 \
  public/hero/frames-mobile/frame_%04d.webp

ffmpeg -loglevel error -sseof -0.1 -i "$SRC" -frames:v 1 \
  -vf "scale=2400:-2:flags=lanczos" -c:v libwebp -quality 85 \
  -y public/hero/final.webp

echo "desktop: $(ls public/hero/frames | wc -l) frames, $(du -sh public/hero/frames | cut -f1)"
echo "mobile:  $(ls public/hero/frames-mobile | wc -l) frames, $(du -sh public/hero/frames-mobile | cut -f1)"
