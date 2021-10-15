import { Morpion } from "./classMorpion.js";
import { MorpionSimple } from "./classMorpionSimple.js";

let morpion;
let nbCoups;
let joueur;
let symbole;
let scores = [0, 0];

let taille;
let modeJeu;
let zoneMessage;

document.getElementsByTagName('body')[0].onload = recommence();

const btnReset = document.getElementById('btn_reset');
btnReset.addEventListener('click', recommence);

function recommence() {
    zoneMessage = document.getElementById('messages');
    taille = Number.parseInt(document.getElementById('taille').value);
    modeJeu = document.getElementById('simple').checked ? 'simple' : 'complet';

    if (modeJeu === 'simple') {
        try {
            morpion = new MorpionSimple(taille);
        } catch (e) {
            alert(e);
            return null;
        }
    } else {
        try {
            morpion = new Morpion(taille);
        } catch (e) {
            alert(e);
            return null;
        }
    }

    const table = document.getElementById('table_morpion');

    for (let l = table.rows.length - 1; l >= 0; l--) {
        table.deleteRow(l);
    }

    for (let i = 0; i < morpion.taille; i++) {
        const ligne = table.insertRow(i);

        for (let j = 0; j < morpion.taille; j++) {
            const id = '' + ((i + 1) * 10 + (j + 1));
            const cell = ligne.insertCell(j);
            cell.innerHTML = "<input type='button' class='case' id='" + id + "'/>";
            document.getElementById(id).value = '';
        }
    }

    for (let i = 0; i < morpion.taille * morpion.taille; i++) {
        let btn_table = document.getElementsByClassName('case');
        let id = btn_table[i].getAttribute("id");
        btn_table[i].addEventListener("click", function() {
            clicBouton(this, Number.parseInt(id[0]) - 1, Number.parseInt(id[1]) - 1);
        });
    }

    nbCoups = 0;
    joueur = 1;
    symbole = 'x';
    zoneMessage.innerHTML = 'Joueur 1, à toi !';
    document.getElementById('btn_reset').disabled = true;
}

function clicBouton(uneCase, y, x) {
    if (morpion.clicBouton(symbole, y, x)) {
        uneCase.value = symbole;
        uneCase.classList.add('joueur' + joueur);
        nbCoups++;

        const victoire = morpion.aGagne(symbole, y, x);

        if (victoire) {
            zoneMessage.innerHTML = 'Le joueur ' + joueur + ' a gagné !';
            desactiveEcouteurs();
            symbole === 'x' ? scores[0]++ : scores[1]++;
            document.getElementById('score').innerHTML = 'X : ' + scores[0] + ' - O  : ' + scores[1];

        } else if (nbCoups === morpion.taille * morpion.taille) {
            zoneMessage.innerHTML = 'Match nul !';
            desactiveEcouteurs();

        } else {
            if (symbole === 'x') {
                symbole = 'o';
                joueur = 2;
            } else {
                symbole = 'x';
                joueur = 1;
            }
            zoneMessage.innerHTML = 'Joueur ' + joueur + ', à toi de jouer !';
        }
    } else {
        zoneMessage.innerHTML = 'Case déjà occupée !!! ';
    }
}

function desactiveEcouteurs() {
    for (let i = 0; i < morpion.taille; i++) {
        for (let j = 0; j < morpion.taille; j++) {
            let btn_res = document.getElementById('' + ((i + 1) * 10 + (j + 1)));
            btn_res.replaceWith(btn_res.cloneNode(true));
        }
    }

    document.getElementById('btn_reset').disabled = false;
}

document.getElementById('score').innerHTML = 'X : ' + scores[0] + ' - O  : ' + scores[1];
