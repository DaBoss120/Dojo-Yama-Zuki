"use strict";
// import { getImages } from './getImages';
var menu = document.getElementById('menu');

window.addEventListener('DOMContentLoaded', function () {
    menu.innerHTML = `
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="inscription.html">Inscription</a></li>
                    <li><a href="evenements.html">Événements</a></li>
                    <li><a href="comite.html">Comité</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="gallerie.html">Gallerie</a></li>
                </ul>
    `
});

function toggleMenu() {
    // const hamburger = document.querySelector(".hamburger");
    menu.style.display == 'block' ? menu.style.display = "none" : menu.style.display = 'block';
    menu.classList.toggle('show');
    // if (menu.style.display === 'block') {
    //     menu.style.display = 'none';
    // } else {
    //     menu.style.display = 'block';
    // }
};
window.addEventListener('resize', function () {
    if (window.innerWidth > 1100) {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
});