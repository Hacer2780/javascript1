
let slideIndex = 0;
const slides = document.querySelectorAll(".slider-item");
const dots = document.querySelectorAll(".slider-dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function plusSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

// Otomatik slider geçişi (Opsiyonel)
setInterval(() => {
  plusSlide(1);
}, 5000); // 5 saniyede bir slide değiştir
