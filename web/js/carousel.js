"use strict";

let slideIndex = 1;
let slideAuto = setInterval(() => {
    plusSlides(1)
}, 5000)
showSlides(slideIndex)

function plusSlides(nb) {
    showSlides(slideIndex += nb);
}

function currentSlide(nb) {
    showSlides(slideIndex = nb);
}

function showSlides(nb) {

    let i;
    let slides = document.querySelectorAll("#carousel-slides");
    let dots = document.querySelectorAll("#dot");
    if (nb > slides.length) { slideIndex = 1 };
    if (nb < 1) { slideIndex = slides.length }
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Deactivate all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // Show correct slide and dot
    slides[slideIndex - 1].style.opacity = "0";
    slides[slideIndex - 1].style.transition = "opacity 0.5s";
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(() => {
        slides[slideIndex - 1].style.opacity = "1";
    }, 10);
    // Clear interval so when a dot or arrow is clicked the five seconds reset to prevent slide skip just after manual skip
    clearInterval(slideAuto);
    slideAuto = setInterval(() => {
        plusSlides(1)
    }, 5000)
}
