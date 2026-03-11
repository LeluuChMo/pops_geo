// Header
window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.scrollY > 0) {
    header.classList.add("opaque");
  } else {
    header.classList.remove("opaque");
  }
});

//  Slider
  let counter = 1;
  const totalSlides = 3;

  setInterval(() => {
    document.getElementById('img' + counter).checked = true;
    counter++;
    if (counter > totalSlides) {
      counter = 1; 
    }
  }, 3000); 

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
  });
});

const slider = document.querySelector(".product-wrapper");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; 
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

const wrapper = document.querySelector(".product-wrapper");
const arrowNext = document.querySelector(".arrow-next");
const arrowPrev = document.querySelector(".arrow-prev");
const scrollAmount = 300;

arrowNext.addEventListener("click", () => {
  wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

arrowPrev.addEventListener("click", () => {
  wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});