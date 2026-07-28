console.log("Kei Maeda portfolio loaded.");

document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");

  const scrollByOneSlide = (direction) => {
    const slide = track.querySelector(".carousel-slide");
    if (!slide) return;
    track.scrollBy({ left: direction * slide.offsetWidth, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", () => scrollByOneSlide(-1));
  nextBtn.addEventListener("click", () => scrollByOneSlide(1));
});

const zoomableImages = document.querySelectorAll(".carousel-slide img");

if (zoomableImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close enlarged image">&times;</button>
    <img class="lightbox-img" alt="" />
    <p class="lightbox-caption"></p>
  `;
  document.body.append(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  let lastFocused = null;

  const openLightbox = (img) => {
    lastFocused = img;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;

    const caption = img.closest("figure")?.querySelector("figcaption");
    lightboxCaption.textContent = caption ? caption.textContent : "";

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
    if (lastFocused) lastFocused.focus();
  };

  zoomableImages.forEach((img) => {
    img.classList.add("zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.title = "Click to enlarge";

    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target !== lightboxImg) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}
