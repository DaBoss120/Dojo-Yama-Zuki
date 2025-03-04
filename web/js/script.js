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
    // menu.style.display == 'block' ? menu.style.display = "none" : menu.style.display = 'block';
    
    const menu = document.querySelector('header .top-header .menu');
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('closing');
        // When the close animation ends, clean up
        menu.addEventListener('animationend', function handler() {
            // Wait for all animations to end
            setTimeout(() => {
                menu.classList.remove('closing');
                menu.removeEventListener('animationend', handler);
            }, 200);
        });
    }
    else{
        menu.classList.add('show');
        menu.style.display = 'flex';
    }
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