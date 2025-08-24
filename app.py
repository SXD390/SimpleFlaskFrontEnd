from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from pathlib import Path
import mimetypes
import os

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50MB

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"ok": False, "error": "No file part"}), 400

    f = request.files["file"]
    if f.filename == "":
        return jsonify({"ok": False, "error": "No selected file"}), 400

    filename = secure_filename(f.filename)
    save_path = UPLOAD_DIR / filename
    f.save(save_path)

    size_bytes = save_path.stat().st_size

    # --- Smarter typing ---
    ext = save_path.suffix.lower().lstrip(".")
    # nice categories and pretty labels
    EXT_MAP = {
        # docs
        "pdf": ("Document", "PDF document", "application/pdf"),
        "doc": ("Document", "Word document", "application/msword"),
        "docx": ("Document", "Word document", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
        "ppt": ("Document", "PowerPoint", "application/vnd.ms-powerpoint"),
        "pptx": ("Document", "PowerPoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"),
        "xls": ("Document", "Excel spreadsheet", "application/vnd.ms-excel"),
        "xlsx": ("Document", "Excel spreadsheet", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
        "csv": ("Document", "CSV text", "text/csv"),
        "txt": ("Document", "Plain text", "text/plain"),
        "md":  ("Document", "Markdown", "text/markdown"),
        "rtf": ("Document", "Rich text", "application/rtf"),
        "json":("Document", "JSON data", "application/json"),
        "ipynb":("Document", "Jupyter Notebook (JSON)", "application/x-ipynb+json"),

        # images
        "png": ("Image", "PNG image", "image/png"),
        "jpg": ("Image", "JPEG image", "image/jpeg"),
        "jpeg":("Image", "JPEG image", "image/jpeg"),
        "gif": ("Image", "GIF image", "image/gif"),
        "webp":("Image", "WEBP image", "image/webp"),
        "svg": ("Image", "SVG image", "image/svg+xml"),

        # archives
        "zip": ("Archive", "ZIP archive", "application/zip"),
        "tar": ("Archive", "TAR archive", "application/x-tar"),
        "gz":  ("Archive", "GZIP archive", "application/gzip"),
        "rar": ("Archive", "RAR archive", "application/vnd.rar"),
        "7z":  ("Archive", "7-Zip archive", "application/x-7z-compressed"),

        # code (common)
        "py":  ("Code", "Python source", "text/x-python"),
        "js":  ("Code", "JavaScript source", "text/javascript"),
        "ts":  ("Code", "TypeScript source", "text/x-typescript"),
        "html":("Code", "HTML document", "text/html"),
        "css": ("Code", "CSS stylesheet", "text/css"),
        "java":("Code", "Java source", "text/x-java-source"),
        "c":   ("Code", "C source", "text/x-c"),
        "cpp": ("Code", "C++ source", "text/x-c++"),
        "go":  ("Code", "Go source", "text/x-go"),
        "rs":  ("Code", "Rust source", "text/rust"),
        "sh":  ("Code", "Shell script", "text/x-shellscript"),
        "yml": ("Code", "YAML", "text/yaml"),
        "yaml":("Code", "YAML", "text/yaml"),
    }

    category, pretty_type, mime_override = EXT_MAP.get(ext, (None, None, None))

    # base guess from Python's mimetypes
    guessed_mime, _ = mimetypes.guess_type(str(save_path))
    mime_type = mime_override or guessed_mime or "application/octet-stream"

    # fallbacks for unknowns
    if not category:
        if mime_type.startswith("image/"):
            category = "Image"
        elif mime_type.startswith(("text/", "application/json")):
            category = "Document"
        elif mime_type in ("application/zip", "application/x-7z-compressed", "application/x-tar", "application/gzip"):
            category = "Archive"
        else:
            category = "Binary"

        pretty_type = pretty_type or (mime_type if mime_type != "application/octet-stream" else "Unknown")

    def human_readable_size(num: int) -> str:
        for unit in ["B", "KB", "MB", "GB", "TB"]:
            if num < 1024:
                return f"{num:.2f} {unit}"
            num /= 1024
        return f"{num:.2f} PB"

    return jsonify({
        "ok": True,
        "filename": filename,
        "extension": f".{ext}" if ext else "",
        "category": category,                # e.g., Document / Image / Code / Archive / Binary
        "pretty_type": pretty_type,          # e.g., Jupyter Notebook (JSON)
        "mime_type": mime_type,              # e.g., application/x-ipynb+json
        "size_bytes": size_bytes,
        "size_human": human_readable_size(size_bytes),
    }), 200

if __name__ == "__main__":
    # Bind to all interfaces so it's reachable on EC2 later
    app.run(host="0.0.0.0", port=80, debug=False)