#!/usr/bin/env python3
"""Synthesize the approved Russian narration in short reliable segments."""

from pathlib import Path
import subprocess
import sys


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


input_path = Path(sys.argv[1])
output_path = Path(sys.argv[2])
work_dir = output_path.parent / "voice-segments"
work_dir.mkdir(parents=True, exist_ok=True)

paragraphs = [
    paragraph.replace("\n", " ").strip()
    for paragraph in input_path.read_text(encoding="utf-8").split("\n\n")
    if paragraph.strip()
]
manifest = work_dir / "concat.txt"
lines = []

for number, paragraph in enumerate(paragraphs, start=1):
    segment = work_dir / f"{number:02d}.mp3"
    run(
        [
            sys.executable,
            "-m",
            "edge_tts",
            "--voice",
            "ru-RU-SvetlanaNeural",
            "--rate=-18%",
            "--text",
            paragraph,
            "--write-media",
            str(segment),
        ]
    )
    lines.append(f"file '{segment}'")

manifest.write_text("\n".join(lines) + "\n", encoding="utf-8")
run(
    [
        "ffmpeg",
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        str(manifest),
        "-c",
        "copy",
        str(output_path),
    ]
)
