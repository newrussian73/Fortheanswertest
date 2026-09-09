"""Create editable Photoshop files from the supplied party-poster renders.

The source images are composite JPEGs, so these are raster (not vector) layers.
Each named object is retained at its original position on a transparent canvas.
"""
from __future__ import annotations

import os
import struct
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


SOURCE = Path("/home/ubuntu/.cursor/projects/workspace/assets")
OUT = Path("party_poster_psd")
FILES = [
    "01a0853c-03f2-7658-93b5-be1a51f2416a.jpg",
    "01a0853c-0407-7235-af9f-91242f0d2a53.jpg",
    "01a0853c-fe3e-776b-9a8c-8863775af19c.jpg",
    "01a0853c-fe53-7fff-b132-417005867636.jpg",
    "01a0853c-fe65-784f-b1ba-97dd543a3311.jpg",
    "01a0853c-fe78-754b-bc27-4ec75a12ee2b.jpg",
    "01a0853c-fe8a-7b4f-b3a9-aa5f0a97e4ef.jpg",
    "01a0853c-fe9c-7c3c-94cc-62a898751afe.jpg",
]


def packbits(row: bytes) -> bytes:
    """Encode one row with Photoshop's PackBits-compatible RLE."""
    out, i, n = bytearray(), 0, len(row)
    while i < n:
        j = i + 1
        while j < n and row[j] == row[i] and j - i < 128:
            j += 1
        if j - i >= 3:
            out += bytes((257 - (j - i), row[i]))
            i = j
            continue
        start = i
        i = j
        while i < n:
            j = i + 1
            while j < n and row[j] == row[i] and j - i < 128:
                j += 1
            if j - i >= 3 or i - start >= 128:
                break
            i = j
        out += bytes((i - start - 1,)) + row[start:i]
    return bytes(out)


def rle_channel(channel: Image.Image) -> bytes:
    rows = [packbits(channel.crop((0, y, channel.width, y + 1)).tobytes())
            for y in range(channel.height)]
    return b"\x00\x01" + struct.pack(f">{len(rows)}H", *(len(r) for r in rows)) + b"".join(rows)


def layer_record(name: str, image: Image.Image, bbox: tuple[int, int, int, int]) -> tuple[bytes, bytes]:
    left, top, right, bottom = bbox
    crop = image.crop(bbox)
    r, g, b, a = crop.split()
    channels = [(0, rle_channel(r)), (1, rle_channel(g)), (2, rle_channel(b)), (-1, rle_channel(a))]
    encoded_name = name.encode("latin-1", "replace")[:255]
    pascal = bytes((len(encoded_name),)) + encoded_name
    pascal += b"\0" * ((4 - len(pascal) % 4) % 4)
    extra = struct.pack(">II", 0, 0) + pascal
    record = struct.pack(">iiii", top, left, bottom, right)
    return record, b""


def psd_layer(name: str, image: Image.Image, bbox: tuple[int, int, int, int]) -> tuple[bytes, bytes]:
    left, top, right, bottom = bbox
    crop = image.crop(bbox)
    r, g, b, a = crop.split()
    channels = [(0, rle_channel(r)), (1, rle_channel(g)), (2, rle_channel(b)), (-1, rle_channel(a))]
    name_bytes = name.encode("latin-1", "replace")[:255]
    pascal = bytes((len(name_bytes),)) + name_bytes
    pascal += b"\0" * ((4 - len(pascal) % 4) % 4)
    extra = struct.pack(">II", 0, 0) + pascal
    rec = struct.pack(">iiii", top, left, bottom, right)
    rec += struct.pack(">H", len(channels))
    rec += b"".join(struct.pack(">hI", ident, len(data)) for ident, data in channels)
    rec += b"8BIMnorm" + bytes((255, 0, 0, 0)) + struct.pack(">I", len(extra)) + extra
    return rec, b"".join(data for _, data in channels)


def alpha_ellipse(size: tuple[int, int], feather: int = 3) -> Image.Image:
    mask = Image.new("L", size)
    ImageDraw.Draw(mask).ellipse((feather, feather, size[0] - feather - 1, size[1] - feather - 1), fill=255)
    return mask.filter(ImageFilter.GaussianBlur(feather))


def alpha_region(image: Image.Image, box: tuple[int, int, int, int], kind: str) -> Image.Image:
    """Select luminous artwork while preserving semi-transparent antialiasing."""
    crop = image.crop(box).convert("RGB")
    pix = crop.load()
    alpha = Image.new("L", crop.size)
    out = alpha.load()
    for y in range(crop.height):
        for x in range(crop.width):
            r, g, b = pix[x, y]
            value = max(r, g, b)
            if kind == "wave":
                keep = max(0, min(255, int((max(r, b) - g * .38 - 45) * 2.0)))
            else:
                keep = max(0, min(255, int((value - 55) * 2.0)))
            out[x, y] = keep
    return alpha.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(1))


def cut(image: Image.Image, box: tuple[int, int, int, int], name: str, kind: str = "ellipse") -> tuple[str, Image.Image, tuple[int, int, int, int]]:
    part = image.crop(box).convert("RGBA")
    if kind == "ellipse":
        alpha = alpha_ellipse(part.size)
    else:
        alpha = alpha_region(image, box, kind)
    part.putalpha(alpha)
    return name, part, (0, 0, part.width, part.height)


def add_object(layers, image, name, box, kind="ellipse"):
    # Store cropped pixels and their document offset in the PSD record.
    sx, sy = image.width / 576, image.height / 1024
    box = (
        round(box[0] * sx), round(box[1] * sy),
        round(box[2] * sx), round(box[3] * sy),
    )
    part = image.crop(box).convert("RGBA")
    if kind == "ellipse":
        part.putalpha(alpha_ellipse(part.size))
    else:
        part.putalpha(alpha_region(image, box, kind))
    layers.append((name, part, box))


def write_psd(path: Path, image: Image.Image, layers: list[tuple[str, Image.Image, tuple[int, int, int, int]]]):
    w, h = image.size
    records, data = [], []
    for name, part, (left, top, right, bottom) in layers:
        r, g, b, a = part.split()
        channels = [(0, rle_channel(r)), (1, rle_channel(g)), (2, rle_channel(b)), (-1, rle_channel(a))]
        raw_name = name.encode("latin-1", "replace")[:255]
        pascal = bytes((len(raw_name),)) + raw_name
        pascal += b"\0" * ((4 - len(pascal) % 4) % 4)
        extra = struct.pack(">II", 0, 0) + pascal
        rec = struct.pack(">iiii", top, left, bottom, right)
        rec += struct.pack(">H", 4)
        rec += b"".join(struct.pack(">hI", ident, len(blob)) for ident, blob in channels)
        rec += b"8BIMnorm" + bytes((255, 0, 0, 0)) + struct.pack(">I", len(extra)) + extra
        records.append(rec)
        data.extend(blob for _, blob in channels)
    layer_info = struct.pack(">h", len(layers)) + b"".join(records) + b"".join(data)
    layer_info += b"\0" * (len(layer_info) % 2)
    layer_mask = struct.pack(">I", len(layer_info)) + layer_info + struct.pack(">I", 0)
    merged = image.convert("RGB")
    merged_data = b"\0\0" + b"".join(ch.tobytes() for ch in merged.split())
    header = b"8BPS" + struct.pack(">H", 1) + b"\0" * 6 + struct.pack(">HIIHH", 3, h, w, 8, 3)
    with path.open("wb") as f:
        f.write(header + struct.pack(">I", 0) + struct.pack(">I", 0) + struct.pack(">I", len(layer_mask)) + layer_mask + merged_data)


def make_layers(image: Image.Image, index: int):
    w, h = image.size
    layers = []
    # Background is deliberately darkened where the bright foreground objects were.
    bg = image.convert("RGBA")
    px = bg.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if max(r, g, b) > 110:
                px[x, y] = (int(r * .16), int(g * .16), int(b * .27), a)
    layers.append(("BACKGROUND - reconstructed", bg, (0, 0, w, h)))

    # Typography and hero elements.
    text_box = (65, 195, 540, 610) if index in (5, 6) else (65, 225, 545, 535)
    year_box = (140, 390, 465, 590) if index in (5, 6) else (135, 480, 455, 710)
    if index == 3:
        text_box, year_box = (90, 55, 520, 330), (150, 275, 440, 430)
    add_object(layers, image, "TEXT - LET'S PARTY", text_box, "text")
    add_object(layers, image, "TEXT - 30 years", year_box, "text")
    disco = (35, 0, 205, 205) if index in (1, 4, 7) else ((20, 0, 235, 245) if index != 3 else (0, 745, 185, 980))
    vinyl = (355, 775, 576, 1024) if index != 3 else (345, 760, 576, 1024)
    add_object(layers, image, "DISCO BALL", disco)
    add_object(layers, image, "VINYL RECORD", vinyl)

    # Nebula waves: each broadly separate cloud bank is independently movable.
    wave_boxes = [(0, 190, 150, 350), (410, 130, 576, 340), (0, 580, 576, 800), (0, 730, 290, 1024), (300, 600, 576, 850)]
    if index == 3:
        wave_boxes = [(0, 240, 180, 410), (395, 200, 576, 390), (0, 600, 576, 820), (0, 820, 330, 1024)]
    for n, box in enumerate(wave_boxes, 1):
        add_object(layers, image, f"NEBULA WAVE {n}", box, "wave")

    # Decorative spheres; the crop boundaries isolate each independent orb.
    spheres = [(72, 70, 147, 145), (36, 212, 88, 264), (17, 392, 76, 452), (500, 270, 576, 350),
               (452, 540, 505, 595), (12, 645, 65, 700), (28, 770, 174, 915), (225, 780, 282, 835),
               (225, 870, 290, 930), (0, 900, 37, 957), (488, 490, 576, 575), (485, 130, 548, 194)]
    if index in (1, 4, 7):
        spheres = [(31, 220, 70, 260), (31, 490, 72, 532), (55, 845, 128, 918), (450, 105, 480, 135),
                   (480, 275, 535, 330), (247, 785, 290, 830), (330, 790, 380, 840), (24, 600, 72, 650)]
    for n, box in enumerate(spheres, 1):
        add_object(layers, image, f"SPHERE {n:02}", box)

    # Sparkles/stars use luminous-pixel alpha instead of an opaque rectangle.
    stars = [(85, 250, 150, 315), (455, 55, 530, 135), (80, 640, 145, 710), (330, 720, 400, 790),
             (345, 15, 420, 75), (470, 360, 535, 425)]
    if index in (5, 6):
        stars += [(100, 440, 155, 500), (170, 130, 225, 195), (215, 500, 275, 560)]
    for n, box in enumerate(stars, 1):
        add_object(layers, image, f"STAR {n:02}", box, "text")
    return layers


def main():
    OUT.mkdir(exist_ok=True)
    for index, filename in enumerate(FILES):
        source = SOURCE / filename
        image = Image.open(source).convert("RGB")
        write_psd(OUT / f"party_poster_{index + 1:02}.psd", image, make_layers(image, index))
        print(f"created party_poster_{index + 1:02}.psd")


if __name__ == "__main__":
    main()
