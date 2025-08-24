// Helper: select
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

  // Show loading state with progress bar
  uploadResult.innerHTML = `
    <div class="meta-card">
      <div class="text-slate-300 mb-3">Uploading <span class="font-semibold">${file.name}</span>…</div>
      <div class="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
        <div class="upload-progress h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300 ease-out"></div>
      </div>
    </div>
  `;
  
  // Animate progress bar
  const progressBar = uploadResult.querySelector('.upload-progress');
  setTimeout(() => progressBar.style.width = '60%', 100);
  setTimeout(() => progressBar.style.width = '90%', 300);

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
