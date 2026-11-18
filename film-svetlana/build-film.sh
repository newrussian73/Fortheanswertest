#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CHAT_ASSETS="/home/ubuntu/.cursor/projects/agent-repos-Fortheanswertest/assets"
MASTER="/opt/cursor/artifacts/assets/svetlana-aged-master-reference-v4.jpg"
BUILD="$ROOT/.build"
EXPORT="$ROOT/exports"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

mkdir -p "$BUILD/slides" "$EXPORT"
rm -f "$BUILD/slides"/*.mp4 "$BUILD/concat.txt"

render_slide() {
  local id="$1" source="$2" duration="$3" chapter="$4" title="$5"
  local frames=$((duration * 25))
  local fade_start=$((duration - 1))

  ffmpeg -y -hide_banner -loglevel error \
    -loop 1 -framerate 25 -t "$duration" -i "$source" \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,\
zoompan=z='min(zoom+0.000035,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=25,\
drawbox=x=0:y=0:w=iw:h=ih:color=black@0.18:t=fill,\
drawtext=fontfile=${FONT}:text='${chapter}':fontcolor=white@0.88:fontsize=27:x=90:y=82,\
drawtext=fontfile=${FONT}:text='${title}':fontcolor=white:fontsize=52:x=90:y=h-145,\
fade=t=in:st=0:d=1,fade=t=out:st=${fade_start}:d=1" \
    -r 25 -pix_fmt yuv420p -c:v libx264 -preset veryfast -crf 20 \
    "$BUILD/slides/${id}.mp4"
  printf "file '%s'\n" "$BUILD/slides/${id}.mp4" >> "$BUILD/concat.txt"
}

# Exact timeline total: 510 seconds / 08:30.
render_slide 01 "$MASTER" 20 "ПРОЛОГ" "СВЕТЛАНА. ПИСЬМО ИЗ БУДУЩЕГО"
render_slide 02 "$MASTER" 20 "ПРОЛОГ" "Семейный альбом"
render_slide 03 "$CHAT_ASSETS/01a1f064-bd05-785d-80d2-9540d9c834b6.jpg" 30 "ГЛАВА 1" "Роза и Саша"
render_slide 04 "$CHAT_ASSETS/01a1f064-bd2e-7be5-b3d3-c8cc705bd305.jpg" 20 "ГЛАВА 1" "Семейные корни"
render_slide 05 "$CHAT_ASSETS/01a1f064-bd7e-7c84-9a0b-87e61caa3ed7.jpg" 20 "ГЛАВА 1" "Память детства"
render_slide 06 "$CHAT_ASSETS/01a1f058-ac83-73e4-a345-809ce3b9e59c.jpg" 35 "ГЛАВА 2" "Михаил — 31 год вместе"
render_slide 07 "$CHAT_ASSETS/01a1f058-c4eb-7406-8ede-51407ec5c38d.jpg" 35 "ГЛАВА 2" "Любовь и общая жизнь"
render_slide 08 "$CHAT_ASSETS/01a1f058-a953-7013-b120-50d8993109b1.jpg" 30 "ГЛАВА 3" "Алла и Владик"
render_slide 09 "$CHAT_ASSETS/01a1f058-ad4c-704b-94d2-b4b1b7d6d221.jpg" 30 "ГЛАВА 3" "Новые страницы семьи"
render_slide 10 "$CHAT_ASSETS/01a1f058-b237-7adf-8ea7-2d3ba6bc58ea.jpg" 30 "ГЛАВА 4" "Дима — 5 лет"
render_slide 11 "$CHAT_ASSETS/01a1f058-b7f8-7718-bc2b-35c5b17d5aa6.jpg" 30 "ГЛАВА 4" "Любовь бабушки"
render_slide 12 "$CHAT_ASSETS/01a1f058-b30a-71f3-9361-540f9ae0e148.jpg" 30 "ГЛАВА 5" "Родные рядом"
render_slide 13 "$CHAT_ASSETS/01a1f079-aa41-7396-8e0a-7e960916b140.jpg" 30 "ГЛАВА 5" "Лена, Света и Аня"
render_slide 14 "$CHAT_ASSETS/01a1f058-c818-755c-901d-39f26dd9b721.jpg" 25 "ГЛАВА 6" "Татьяна и Валерий"
render_slide 15 "$CHAT_ASSETS/01a1f058-b588-7cbf-8ad9-b9bbc08d2957.jpg" 40 "ГЛАВА 7" "Семья — это любовь"
render_slide 16 "$CHAT_ASSETS/01a1f058-c73b-7feb-8576-572d14d1429c.jpg" 40 "ГЛАВА 7" "Спасибо за прожитую жизнь"
render_slide 17 "$MASTER" 20 "ГЛАВА 8" "Листая страницы жизни"
render_slide 18 "$MASTER" 25 "ФИНАЛ" "С днём рождения, Светлана"

ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$BUILD/concat.txt" \
  -c copy "$BUILD/picture-track.mp4"

# A licensed-free original ambient bed assembled from synthetic tones.
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "aevalsrc=0.025*sin(2*PI*220*t)+0.018*sin(2*PI*277.18*t)+0.014*sin(2*PI*329.63*t)+0.010*sin(2*PI*440*t):s=48000:d=510" \
  -af "lowpass=f=1800,volume=0.24,afade=t=in:st=0:d=4,afade=t=out:st=502:d=8" \
  -c:a aac -b:a 192k "$BUILD/music.m4a"

python3 "$ROOT/create-voice.py" "$ROOT/audio/voiceover-ru.txt" "$BUILD/voice.mp3"

ffmpeg -y -hide_banner -loglevel error -i "$BUILD/music.m4a" -i "$BUILD/voice.mp3" \
  -filter_complex "[0:a]volume=0.55[music];[1:a]volume=1.25,adelay=4500|4500[voice];[music][voice]amix=inputs=2:duration=first:dropout_transition=2[a]" \
  -map "[a]" -t 510 -c:a aac -b:a 192k "$BUILD/audio.m4a"

ffmpeg -y -hide_banner -loglevel error -i "$BUILD/picture-track.mp4" -i "$BUILD/audio.m4a" \
  -map 0:v:0 -map 1:a:0 -t 510 -r 25 -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart "$EXPORT/svetlana-pismo-iz-budushchego-1080p25.mp4"

ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate \
  -of default=noprint_wrappers=1 "$EXPORT/svetlana-pismo-iz-budushchego-1080p25.mp4"
