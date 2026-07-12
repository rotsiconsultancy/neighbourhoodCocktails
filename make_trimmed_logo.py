import base64
import io
import os
import xml.etree.ElementTree as ET
from PIL import Image

SOURCE_SVG = "/home/alvin/Desktop/Projects/neighbourhoodCocktails/public/images/logo_bg_f6efe3.svg"
OUTPUT_DIR = "/home/alvin/Desktop/Projects/neighbourhoodCocktails/public/images"
BG_COLOR = "#f6efe3"
PADDING = 4
XLINK = "{http://www.w3.org/1999/xlink}href"


def extract_embedded_images(svg_path):
    root = ET.parse(svg_path).getroot()
    images = [el for el in root.iter() if el.tag.endswith("image")]
    if len(images) < 2:
        raise ValueError("Expected at least 2 embedded images inside the SVG.")

    mask_b64 = images[0].attrib[XLINK].split(",", 1)[1]
    logo_b64 = images[1].attrib[XLINK].split(",", 1)[1]
    mask_img = Image.open(io.BytesIO(base64.b64decode(mask_b64))).convert("L")
    logo_img = Image.open(io.BytesIO(base64.b64decode(logo_b64))).convert("RGBA")
    return mask_img, logo_img


def build_transparent_logo(mask_img, logo_img):
    r, g, b, _ = logo_img.split()
    rgba = Image.merge("RGBA", (r, g, b, mask_img))
    bbox = mask_img.point(lambda p: 255 if p > 10 else 0).getbbox()
    if not bbox:
        raise ValueError("Could not detect logo bounds.")

    left, top, right, bottom = bbox
    left = max(0, left - PADDING)
    top = max(0, top - PADDING)
    right = min(rgba.width, right + PADDING)
    bottom = min(rgba.height, bottom + PADDING)
    return rgba.crop((left, top, right, bottom))


def png_to_base64(img):
    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def write_svg(path, width, height, png_b64, with_bg):
    background = f'  <rect width="100%" height="100%" fill="{BG_COLOR}"/>\n' if with_bg else ""
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" version="1.1">
{background}  <image width="{width}" height="{height}" href="data:image/png;base64,{png_b64}"/>
</svg>
'''
    with open(path, "w", encoding="utf-8") as file:
        file.write(svg)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    mask_img, logo_img = extract_embedded_images(SOURCE_SVG)
    cropped = build_transparent_logo(mask_img, logo_img)
    png_b64 = png_to_base64(cropped)
    width, height = cropped.size

    write_svg(os.path.join(OUTPUT_DIR, "logo_bg_f6efe3_trimmed.svg"), width, height, png_b64, True)
    write_svg(os.path.join(OUTPUT_DIR, "logo_transparent_trimmed.svg"), width, height, png_b64, False)
    print(f"Created {width}x{height} trimmed logo assets")


if __name__ == "__main__":
    main()
