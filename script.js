(function () {
  const extensions = ["png", "jpg", "jpeg", "webp", "avif"];

  function tryImage(img, names, index) {
    if (index >= names.length) {
      img.classList.add("is-missing");
      return;
    }

    const src = `photos/${names[index]}`;
    img.onerror = () => tryImage(img, names, index + 1);
    img.onload = () => img.classList.remove("is-missing");
    img.src = src;
  }

  document.querySelectorAll("img[data-photo]").forEach((img) => {
    const bases = img.dataset.photo.split(",").map((item) => item.trim()).filter(Boolean);
    const candidates = [];

    bases.forEach((base) => {
      if (/\.(png|jpe?g|webp|avif)$/i.test(base)) {
        candidates.push(base);
      } else {
        extensions.forEach((ext) => candidates.push(`${base}.${ext}`));
      }
    });

    tryImage(img, candidates, 0);
  });

  const galleryImages = [
    "1000065859.png",
    "IMG-20260317-WA0025.jpg.jpeg",
    "IMG-20260326-WA0006.jpg.jpeg",
    "IMG-20260326-WA0016.jpg.jpeg",
    "IMG-20260404-WA0008.jpg.jpeg",
    "IMG-20260417-WA0032.jpg.jpeg",
    "IMG-20260522-WA0000.jpg.jpeg",
    "IMG-20260531-WA0002.jpg.jpeg",
    "IMG_20260318_163017.jpg.jpeg",
    "Invitation.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.06 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.18 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.19 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.24 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.25 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.26 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.37 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.43 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.25.44 AM.jpeg",
    "WhatsApp Image 2026-06-03 at 10.26.07 AM.jpeg"
  ];

  const galleryGrid = document.querySelector("#galleryGrid");
  const galleryMore = document.querySelector("#galleryMore");
  const galleryBatchSize = 9;
  let visibleGalleryCount = 0;

  function renderGalleryBatch() {
    if (!galleryGrid || !galleryMore) return;

    const nextImages = galleryImages.slice(visibleGalleryCount, visibleGalleryCount + galleryBatchSize);

    nextImages.forEach((fileName) => {
      const card = document.createElement("article");
      const image = document.createElement("img");

      card.className = "gallery-card";
      image.src = `gallery/${encodeURIComponent(fileName)}`;
      image.alt = "DhipyCare event photo";
      image.loading = "lazy";

      card.appendChild(image);
      galleryGrid.appendChild(card);
    });

    visibleGalleryCount += nextImages.length;
    galleryMore.hidden = visibleGalleryCount >= galleryImages.length;
  }

  if (galleryGrid && galleryMore) {
    renderGalleryBatch();
    galleryMore.addEventListener("click", renderGalleryBatch);
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }
})();
