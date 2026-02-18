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