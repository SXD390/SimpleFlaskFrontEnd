// Helper: select
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Animal selector logic
const animalOutput = $("#animalOutput");
const toggles = $$(".animal-toggle");

// Ensure only one checkbox is active at a time
toggles.forEach(cb => {
  cb.addEventListener("change", () => {
    if (cb.checked) {
      toggles.forEach(other => { if (other !== cb) other.checked = false; });
      showAnimal(cb.value);
    } else {
      // If the active one is unchecked, clear
      if (!toggles.some(t => t.checked)) animalOutput.innerHTML = "";
    }
  });
});

function showAnimal(kind) {
  const map = {
    cat: "/static/images/cat.jpg",
    dog: "/static/images/dog.jpg",
    elephant: "/static/images/elephant.jpg"
  };
  const src = map[kind];
  animalOutput.innerHTML = `
    <div class="relative">
      <img class="animal-img" alt="${kind}" src="${src}" />
      <div class="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-sm border border-white/10">
        ${kind.charAt(0).toUpperCase() + kind.slice(1)}
      </div>
    </div>
  `;
  // subtle float effect
  const img = $(".animal-img", animalOutput);
  img.style.animation = "fadeScaleIn .35s ease forwards, floaty 5s ease-in-out infinite";
}

// File upload logic
const dropZone = $("#dropZone");
const fileInput = $("#fileInput");
const uploadResult = $("#uploadResult");

function setDragState(on) {
  dropZone.classList.toggle("dragover", on);
}

["dragenter", "dragover"].forEach(evt =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragState(true);
  })
);

["dragleave", "drop"].forEach(evt =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault(); e.stopPropagation();
    if (evt === "drop") {
      handleFiles(e.dataTransfer.files);
    }
    setDragState(false);
  })
);

// Clicking the zone opens the file dialog (via the input covering it)
fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFiles(files);
});

async function handleFiles(fileList) {
  if (!fileList || !fileList.length) return;
  const file = fileList[0];

  const form = new FormData();
  form.append("file", file);

  // Optional: little loading shimmer
  uploadResult.innerHTML = `
    <div class="meta-card">
      <div class="text-slate-300">Uploading <span class="font-semibold">${file.name}</span>…</div>
    </div>
  `;

  try {
    const res = await fetch("/upload", { method: "POST", body: form });
    const data = await res.json();

    if (!data.ok) {
      uploadResult.innerHTML = `
        <div class="meta-card">
          <div class="text-rose-300">Error: ${data.error || "Upload failed"}</div>
        </div>
      `;
      return;
    }

    uploadResult.innerHTML = `
      <div class="meta-card">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <div class="meta-label">Filename</div>
            <div class="meta-value break-all">${data.filename}</div>
          </div>
          <div>
            <div class="meta-label">Size</div>
            <div class="meta-value">${data.size_human}</div>
          </div>
          <div>
            <div class="meta-label">MIME Type</div>
            <div class="meta-value">${data.mime_type}</div>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    uploadResult.innerHTML = `
      <div class="meta-card">
        <div class="text-rose-300">Network error while uploading.</div>
      </div>
    `;
  }
}
