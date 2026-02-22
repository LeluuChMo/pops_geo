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
  const totalSlides = 3; // Change this to match your number of slides

  setInterval(() => {
    // Select the radio button by its ID and check it
    document.getElementById('img' + counter).checked = true;
    
    counter++;
    if (counter > totalSlides) {
      counter = 1; // Reset to the first slide after the last one
    }
  }, 3000); // Change 3000 to your preferred time in milliseconds (e.g., 5000 for 5 seconds)




document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
  });
});

// Product Swiper
// (() => {
//   const wrapper = document.querySelector(".product-wrapper");
//   const cards = document.querySelectorAll(".product-card");
//   const prev = document.querySelector(".product-btn.prev");
//   const next = document.querySelector(".product-btn.next");

//   let index = 0;
//   let startX = 0;
//   let isSwiping = false;

//   function slidesPerView() {
//     return window.innerWidth >= 768 ? 3 : 1;
//   }

//   function update() {
//     const perView = slidesPerView();
//     const maxIndex = cards.length - perView;
//     index = Math.max(0, Math.min(index, maxIndex));
//     wrapper.style.transform = `translateX(-${index * (100 / perView)}%)`;
//   }

//   prev.addEventListener("click", () => {
//     index--;
//     update();
//   });

//   next.addEventListener("click", () => {
//     index++;
//     update();
//   });

//   // Touch support
//   wrapper.addEventListener("touchstart", e => {
//     startX = e.touches[0].clientX;
//     isSwiping = true;
//   });

//   wrapper.addEventListener("touchmove", e => {
//     if (!isSwiping) return;
//     const diff = startX - e.touches[0].clientX;
//     if (Math.abs(diff) > 60) {
//       diff > 0 ? next.click() : prev.click();
//       isSwiping = false;
//     }
//   });

//   wrapper.addEventListener("touchend", () => {
//     isSwiping = false;
//   });

//   window.addEventListener("resize", update);
// })();




const slider = document.querySelector(".product-wrapper");

let isDown = false;
let startX;
let scrollLeft;

// MOUSE EVENTS
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
  const walk = (x - startX) * 1.5; // drag speed
  slider.scrollLeft = scrollLeft - walk;
});

// TOUCH EVENTS
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