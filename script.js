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
    document.body.classList.toggle("menu-open"); // ✅ add this here
  });
});

const wrapper = document.querySelector(".product-wrapper");
const arrowNext = document.querySelector(".arrow-next");
const arrowPrev = document.querySelector(".arrow-prev");

arrowNext.addEventListener("click", () => {
  const cardWidth = wrapper.querySelector(".product-card").offsetWidth + 20; // + gap
  wrapper.scrollBy({ left: cardWidth, behavior: "smooth" });
});

arrowPrev.addEventListener("click", () => {
  const cardWidth = wrapper.querySelector(".product-card").offsetWidth + 20;
  wrapper.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

//DRAG SCROLLING

let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  wrapper.classList.add("active");
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener("mouseleave", () => {
  isDown = false;
});

wrapper.addEventListener("mouseup", () => {
  isDown = false;
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5; // speed
  wrapper.scrollLeft = scrollLeft - walk;
});
