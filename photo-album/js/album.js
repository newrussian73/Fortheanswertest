(() => {
  const photos = document.querySelectorAll(".photo");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox__image");
  const closeBtn = lightbox?.querySelector(".lightbox__close");

  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  photos.forEach((photo, index) => {
    photo.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    reveal.observe(photo);

    const img = photo.querySelector("img");
    if (!img || !lightbox || !lightboxImage) return;

    img.addEventListener("click", () => {
      lightboxImage.src = img.dataset.full || img.src;
      lightboxImage.alt = img.alt || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();
