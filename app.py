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
    mime_type, _ = mimetypes.guess_type(str(save_path))

    def human_readable_size(num: int) -> str:
        for unit in ["B", "KB", "MB", "GB"]:
            if num < 1024:
                return f"{num:.2f} {unit}"
            num /= 1024
        return f"{num:.2f} TB"

    return jsonify({
        "ok": True,
        "filename": filename,
        "size_bytes": size_bytes,
        "size_human": human_readable_size(size_bytes),
        "mime_type": mime_type or "application/octet-stream"
    }), 200

if __name__ == "__main__":
    # Bind to all interfaces so it's reachable on EC2 later
    app.run(host="0.0.0.0", port=80, debug=True)
