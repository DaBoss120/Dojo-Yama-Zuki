"use strict";
var menu = document.getElementById('menu');

window.addEventListener('DOMContentLoaded', function () {
    menu.innerHTML = `
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="inscription.html">Inscription</a></li>
                    <li><a href="evenements.html">Evenements</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
    `
});