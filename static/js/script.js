// Helper: select
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Helper function for category icons
function iconForCategory(cat) {
  // Minimal inline SVG set; you can expand if you like.
  const svg = {
    Document: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L13 3.5z"/></svg>`,
    Image: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2zM8.5 11.5A2.5 2.5 0 1 1 11 9a2.5 2.5 0 0 1-2.5 2.5zM5 19l4.5-6 3.5 4.5 2.5-3L19 19H5z"/></svg>`,
    Archive: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 5.23l-1.39-1.39A1.996 1.996 0 0 0 17.72 3H6.28c-.53 0-1.04.21-1.41.59L3.46 5.23C3.17 5.52 3 5.91 3 6.32V9h18V6.32c0-.41-.17-.8-.46-1.09zM3 20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11H3v9zM9 13h6v2H9v-2z"/></svg>`,
    Code: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L4 12l4.59-4.59L10 8.82 6.83 12 10 15.18l-1.41 1.41zM15.41 7.41L20 12l-4.59 4.59L14 15.18 17.17 12 14 8.82l1.41-1.41z"/></svg>`,
    Binary: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>`
  };
  return svg[cat] || svg.Binary;
}

// ----- Animal buttons -----
const animalOutput = document.querySelector("#animalOutput");
const animalBtns = Array.from(document.querySelectorAll(".animal-btn"));

animalBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    // ripple
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", `${e.clientX - rect.left}px`);
    btn.style.setProperty("--ry", `${e.clientY - rect.top}px`);
    btn.classList.remove("rippling"); // restart
    void btn.offsetWidth;
    btn.classList.add("rippling");

    // active state
    animalBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    showAnimal(btn.dataset.kind);
    
    // Update selected indicator
    const indicator = document.querySelector("#selectedIndicator");
    if (indicator) {
      indicator.innerHTML = `<span class="text-sm text-slate-400/70">Selected: <span class="font-semibold text-cyan-300">${btn.dataset.kind.charAt(0).toUpperCase() + btn.dataset.kind.slice(1)}</span></span>`;
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

  // Show skeleton shimmer first
  animalOutput.innerHTML = `
    <div class="relative">
      <div class="animal-img skeleton-shimmer"></div>
    </div>
  `;

  // Create and load the actual image
  const img = new Image();
  img.onload = function() {
    animalOutput.innerHTML = `
      <div class="relative">
        <img class="animal-img" alt="${kind}" src="${src}" />
        <div class="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-sm border border-white/10">
          ${kind.charAt(0).toUpperCase()+kind.slice(1)}
        </div>
      </div>
    `;
    
    const loadedImg = animalOutput.querySelector(".animal-img");
    loadedImg.style.animation = "fadeScaleIn .35s ease forwards, floaty 5s ease-in-out infinite";
  };
  
  img.src = src;
}

// File upload logic
const dropZone = $("#dropZone");
const fileInput = $("#fileInput");
const uploadList = document.querySelector("#uploadList");

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
fileInput.addEventListener("change", e => {
  if (e.target.files.length) {
    handleFiles(e.target.files);
    e.target.value = "";
  }
});

function makeUploadingCard(file) {
  const el = document.createElement("div");
  el.className = "file-card enter-fade-up";
  el.innerHTML = `
    <button class="file-close">&times;</button>
    <div class="file-header">
      <div class="file-icon shimmer"></div>
      <div class="file-title"><span class="file-name">${file.name}</span></div>
      <div class="badges">
        ${file.name.includes(".") ? `<span class="badge mono">.${file.name.split(".").pop()}</span>` : ""}
        <span class="badge">Uploading…</span>
      </div>
    </div>
    <div class="file-divide"></div>
    <div class="kv">
      <div class="item shimmer" style="height:48px;"></div>
      <div class="item shimmer" style="height:48px;"></div>
      <div class="item shimmer" style="height:48px;"></div>
    </div>
  `;
  el.querySelector(".file-close").addEventListener("click", () => el.remove());
  uploadList.prepend(el);
  return el;
}

function fillCardWithResult(el, data) {
  el.innerHTML = `
    <button class="file-close">&times;</button>
    <div class="file-header">
      <div class="file-icon">${iconForCategory(data.category)}</div>
      <div class="file-title"><span class="file-name">${data.filename}</span></div>
      <div class="badges">
        ${data.extension ? `<span class="badge mono">${data.extension}</span>` : ""}
        <span class="badge">${data.category}</span>
      </div>
    </div>
    <div class="file-divide"></div>
    <div class="kv">
      <div class="item"><div class="label">Pretty Type</div><div class="value">${data.pretty_type}</div></div>
      <div class="item"><div class="label">Size</div><div class="value">${data.size_human} <span class="text-slate-500 mono">(${data.size_bytes} bytes)</span></div></div>
      <div class="item"><div class="label">MIME Type</div><div class="value mono">${data.mime_type}</div></div>
    </div>
  `;
  el.querySelector(".file-close").addEventListener("click", () => el.remove());
}

function fillCardWithError(el, msg) {
  el.innerHTML = `
    <button class="file-close">&times;</button>
    <div class="file-header">
      <div class="file-icon">${iconForCategory("Binary")}</div>
      <div class="file-title"><span class="file-name">Upload failed</span></div>
      <div class="badges"><span class="badge">Error</span></div>
    </div>
    <div class="file-divide"></div>
    <div class="kv">
      <div class="item" style="grid-column:1/-1;">
        <div class="label">Reason</div>
        <div class="value text-rose-300">${msg}</div>
      </div>
    </div>
  `;
  el.querySelector(".file-close").addEventListener("click", () => el.remove());
}

async function handleFiles(fileList) {
  const files = Array.from(fileList);
  const CONCURRENCY = 3;
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const file = files[index++];
      const card = makeUploadingCard(file);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/upload", { method: "POST", body: form });
        const data = await res.json();
        res.ok && data.ok ? fillCardWithResult(card, data) : fillCardWithError(card, data.error || `HTTP ${res.status}`);
      } catch {
        fillCardWithError(card, "Network error");
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
}
