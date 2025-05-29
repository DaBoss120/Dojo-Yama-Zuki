"use strict";
// import { getImages } from './getImages';
var menu = document.getElementById('menu');

window.addEventListener('DOMContentLoaded', function () {
    menu.innerHTML = `
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="inscription.html">Inscription</a></li>
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
    // If the menu is currently shown, hide it with animation
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('closing');
        // When the close animation ends, clean up
        menu.addEventListener('animationend', function handler(event) {
            if (event.target === menu) {
                if (event.animationName === 'menuBackgroundSlideUp') {
                    menu.classList.remove('closing');
                    // Wait for all animations to end
                    setTimeout(() => {
                        menu.removeEventListener('animationend', handler);
                        document.body.classList.remove('no-scroll');

                    }, 200);
                }
            }
        });

    }
    // If the menu is currently hidden, show it with animation
    else {
        menu.classList.add('show');
        menu.style.display = 'flex';

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
        document.body.classList.add('no-scroll');
        }, 200);
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
        document.body.classList.remove('no-scroll');
        menu.classList.remove('show');
        menu.classList.remove('closing');

    } else {
        menu.style.display = 'none';
    }
});