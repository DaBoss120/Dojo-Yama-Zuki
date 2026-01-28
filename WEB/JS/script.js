"use strict";
// import { getImages } from './getImages';
var topHeader = document.querySelector('.top-header');

window.addEventListener('DOMContentLoaded', function () {
    const baseUrl = window.location.origin;

    const isOnHomePage = baseUrl == window.location.href || baseUrl + '/Dojo-Yama-Zuki/' == window.location.href;
    topHeader.innerHTML = `
     <div class="logo">
                <a href="/Dojo-Yama-Zuki/"><img src="${isOnHomePage ? "WEB/IMG/logo.jpg" : "../WEB/IMG/logo.jpg"}" alt="logo"></a>
            </div>
            <div class="menu" id="menu"> 
                <ul>
                    <li><a href="/Dojo-Yama-Zuki/">Accueil</a></li>
                    <li><a href="/Dojo-Yama-Zuki/inscription">Inscription</a></li>
                    <li><a href="/Dojo-Yama-Zuki/comite/">Comité</a></li>
                    <li><a href="/Dojo-Yama-Zuki/contact/">Contact</a></li>
                    <li><a href="/Dojo-Yama-Zuki/gallerie/">Gallerie</a></li>
                </ul>
            </div>
            
            <label class="hamburger">
                <input type="checkbox" onclick="toggleMenu()">
                <svg viewBox="0 0 32 32">
                    <path class="line line-top-bottom"
                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
                    </path>
                    <path class="line" d="M7 16 27 16"></path>
                </svg>
            </label>
               
    `
    this.document.querySelector('main').style.transition = 'opacity 0.5s';
    setTimeout(() => {
        this.document.querySelector('main').style.opacity = 1;
    }, 10);
});

function toggleMenu() {
 const menu = document.querySelector('header .top-header .menu');
    menu.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
};

/**
 * Resets the mobile menu to the desktop state if the window is resized
 * to be larger than the mobile breakpoint.
 */
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        const menu = document.querySelector('header .top-header .menu');
        const hamburgerInput = document.querySelector('.hamburger input');

        // Clean up mobile-specific classes and state
        menu.classList.remove('show');
        document.body.classList.remove('no-scroll');
        if (hamburgerInput) {
            hamburgerInput.checked = false;
        }
    }
});