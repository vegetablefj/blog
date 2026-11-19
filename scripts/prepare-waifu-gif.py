"""Convert an animated GIF or WebP to a PNG frame atlas and a widget manifest."""

import argparse
import json
import math
from pathlib import Path
from urllib.parse import quote

from PIL import Image


DEFAULT_FRAME_DURATION = 100


def make_atlas(animation, max_edge):
    frame_width, frame_height = animation.size
    count = animation.n_frames
    columns = min(count, max(1, math.ceil(math.sqrt(count * frame_height / frame_width))))
    rows = (count + columns - 1) // columns
    atlas_edge = max(frame_width * columns, frame_height * rows)
    if max_edge and atlas_edge > max_edge:
        frame_width = max(1, frame_width * max_edge // atlas_edge)
        frame_height = max(1, frame_height * max_edge // atlas_edge)
        if max(frame_width * columns, frame_height * rows) > max_edge:
            raise ValueError("--max-edge is too small for this animation's frame count")

    frame_size = (frame_width, frame_height)
    atlas = Image.new("RGBA", (frame_width * columns, frame_height * rows))
    durations = []
    for index in range(count):
        animation.seek(index)
        with animation.convert("RGBA") as frame:
            durations.append(max(0, animation.info.get("duration", 0)) or DEFAULT_FRAME_DURATION)
            position = ((index % columns) * frame_width, (index // columns) * frame_height)
            if frame.size == frame_size:
                atlas.paste(frame, position)
            else:
                with frame.resize(frame_size, Image.Resampling.LANCZOS) as resized:
                    atlas.paste(resized, position)
    return atlas, columns, frame_size, durations


def write_outputs(output, png_path, atlas, manifest):
    output.parent.mkdir(parents=True, exist_ok=True)
    created = []
    try:
        with png_path.open("xb") as image_file:
            created.append(png_path)
            atlas.save(image_file, format="PNG")
        with output.open("x", encoding="utf-8") as manifest_file:
            created.append(output)
            json.dump(manifest, manifest_file, ensure_ascii=False, indent=2)
            manifest_file.write("\n")
    except BaseException:
        for path in created:
            path.unlink(missing_ok=True)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="source .gif or .webp file")
    parser.add_argument("output", type=Path, help="new .json manifest with a sibling .png atlas")
    parser.add_argument("--mode", choices=("loop", "speed-follow", "range-follow"), required=True)
    parser.add_argument("--start-frame", type=int, help="inclusive zero-based range start")
    parser.add_argument("--end-frame", type=int, help="inclusive zero-based range end")
    parser.add_argument("--max-edge", type=int, help="optional maximum atlas edge in pixels")
    args = parser.parse_args()

    if args.input.suffix.lower() not in {".gif", ".webp"} or args.output.suffix != ".json":
        parser.error("provide a .gif or .webp input and a .json output")
    bounds = {key: value for key, value in {
        "startFrame": args.start_frame,
        "endFrame": args.end_frame,
    }.items() if value is not None}
    if bounds and args.mode != "range-follow":
        parser.error("frame bounds require --mode range-follow")
    if args.max_edge is not None and args.max_edge < 1:
        parser.error("--max-edge must be positive")

    png_path = args.output.with_suffix(".png")
    try:
        for path in (args.output, png_path):
            if path.exists() or path.is_symlink():
                raise FileExistsError(f"output already exists: {path}")
        with Image.open(args.input, formats=["GIF", "WEBP"]) as animation:
            start = bounds.get("startFrame", 0)
            end = bounds.get("endFrame", animation.n_frames - 1)
            if not 0 <= start <= end < animation.n_frames:
                raise ValueError(f"frame bounds must satisfy 0 <= start <= end < {animation.n_frames}")
            atlas, columns, (width, height), durations = make_atlas(animation, args.max_edge)
        with atlas:
            write_outputs(args.output, png_path, atlas, {
                "type": "gif",
                "mode": args.mode,
                "image": f"./{quote(png_path.name)}",
                "frameWidth": width,
                "frameHeight": height,
                "columns": columns,
                "durations": durations,
                **bounds,
            })
    except (OSError, ValueError, Image.DecompressionBombError) as error:
        parser.error(str(error))


if __name__ == "__main__":
    main()
