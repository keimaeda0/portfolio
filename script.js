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
