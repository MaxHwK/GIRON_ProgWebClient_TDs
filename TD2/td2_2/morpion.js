let joueur1 = prompt("Veuillez saisir le nom du Joueur n°1", "Joueur n°1");
let joueur2 = prompt("Veuillez saisir le nom du Joueur n°2", "Joueur n°2");
let tailleGrille;

do {
    tailleGrille = prompt("Veuillez choisir la taille de la grille comprise entre 3x3 et 8x8, veuillez saisir une valeur comprise entre 3 et 8");
} while (tailleGrille < 3 || tailleGrille > 8);

let mode = "simple"

if (confirm("Voulez-vous jouer en mode complet ? (aligner n symbôles identiques dans la grille nxn pour gagner)")) {
    mode = "complet";
}

let score1 = 0;
let score2 = 0;

function affichPoints() {

    let points = document.getElementsByTagName("p");

    for (let i = 0; i < points.length; i++) {

        points[i].innerHTML = joueur1 + " : " + score1 + " points " + "<br>" + joueur2 + " : " + score2 + " points ";
    }
}

affichPoints();

function genereGrille() {

    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");
    let genereID = 0;

    for (let i = 0; i < tailleGrille; i++) {

        let ligne = document.createElement("tr");

        for (let j = 0; j < tailleGrille; j++) {

            let cellule = document.createElement("td");
            let taille = 100 / tailleGrille;
            taille += "%";

            cellule.setAttribute("Id", genereID);
            cellule.setAttribute("align", "center");
            cellule.setAttribute("onClick", "getId(this.id)");
            cellule.setAttribute("width", taille);
            cellule.setAttribute("height", taille);
            cellule.setAttribute("value", "0");

            let celluleTexte = document.createTextNode(" ");

            cellule.appendChild(celluleTexte);
            ligne.appendChild(cellule);
            genereID++;
        }

        tableBody.appendChild(ligne);
    }

    table.appendChild(tableBody);
    body.appendChild(table);

    table.setAttribute("border", "2");
    table.setAttribute("align", "center");
    table.setAttribute("width", "500");
    table.setAttribute("height", "500");
    table.setAttribute("table-layout", "fixed");
}

genereGrille();



let nb = 0;
let x = 0;
let gagne = false;
let fin = false;

function getId(id) {

    let img = document.createElement("img");

    img.setAttribute("width", "40");
    img.setAttribute("height", "40");

    let block;

    if (fin !== true) {

        if (document.getElementById(id).innerHTML === " ") {

            if (x % 2 === 0) {

                img.src = "img/etoile.png";
                block = document.getElementById(id);
                block.appendChild(img);
                document.getElementById(id).value = "1";

            } else {

                img.src = "img/cube.png";
                block = document.getElementById(id);
                block.appendChild(img);
                document.getElementById(id).value = "2";
            }

            x++;
        }

        let grille = document.getElementsByTagName("td");

        for (let i = 0; i < grille.length; i++) {

            if (mode !== "simple") {

                if (i % tailleGrille === 0 && grille[i].value !== undefined && gagne === false) {
                    gagne = verifLigne(i, grille);
                }

                if (parseInt(i / tailleGrille) === 0 && grille[i].value !== undefined) {
                    gagne = verifColonne(i, grille);
                }

                if (i === 0 && grille[0].value !== undefined && gagne === false) {
                    gagne = verifDiagonale(grille);
                }

                if (i === tailleGrille - 1 && grille[tailleGrille - 1].value !== undefined && gagne === false) {
                    gagne = verifDiagonaleInv(grille);
                }

            } else {

                if (i % tailleGrille <= tailleGrille - 3 && grille[i].value !== undefined && gagne === false) {
                    gagne = verifLigneSimple(i, grille);
                }

                if (parseInt(i / tailleGrille) <= tailleGrille - 3 && grille[i].value !== undefined) {
                    gagne = verifColonneSimple(i, grille);
                }

                if (parseInt(i / tailleGrille) <= tailleGrille - 3 && i % tailleGrille <= tailleGrille - 3 && grille[i].value !== undefined && gagne === false) {
                    gagne = verifDiagonaleSimple(i, grille);
                }

                if (parseInt(i / tailleGrille) < tailleGrille - 3 && i % tailleGrille > 1 && grille[i].value !== undefined && gagne === false) {
                    gagne = verifDiagonaleInvSimple(i, grille);
                }
            }

            if (gagne === true) {

                if (nb === 0) {

                    if (grille[i].value === "1") {
                        score1 += 1;
                        alert(joueur1 + " a gagné cette partie !");
                    }

                    if (grille[i].value === "2") {
                        score2 += 1;
                        alert(joueur2 + " a gagné cette partie !");
                    }

                    fin = true;
                    affichPoints();
                    nb++;
                }
            }
        }
    }

    if (fin === true) {
        boutonRejouer();
        gagne = false;
    }
}

function verifLigne(ligne, grille) {

    let gagne = true;

    for (let i = 1; i < tailleGrille; i++) {
        if (grille[ligne].value !== grille[ligne + i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifColonne(colonne, grille) {

    let gagne = true;

    for (let i = 1; i < tailleGrille; i++) {
        if (grille[colonne].value !== grille[colonne + tailleGrille * i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifDiagonale(grille) {

    let gagne = true;

    for (let i = 1; i < tailleGrille; i++) {
        if (grille[0].value !== grille[tailleGrille * i + i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifDiagonaleInv(grille) {

    let gagne = true;

    for (let i = 1; i < tailleGrille; i++) {
        if (grille[tailleGrille - 1].value !== grille[tailleGrille - 1 + tailleGrille * i - i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifLigneSimple(ligne, grille) {

    let gagne = true;

    for (let i = 1; i <= 2; i++) {
        if (grille[ligne].value !== grille[ligne + i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifColonneSimple(colonne, grille) {

    let gagne = true;

    for (let i = 1; i <= 2; i++) {
        if (grille[colonne].value !== grille[colonne + tailleGrille * i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifDiagonaleSimple(pos, grille) {

    let gagne = true;

    for (let i = 1; i <= 2; i++) {
        if (grille[pos].value !== grille[pos + tailleGrille * i + i].value) {
            gagne = false;
        }
    }

    return gagne;
}

function verifDiagonaleInvSimple(pos, grille) {

    let gagne = true;

    for (let i = 1; i <= 2; i++) {
        if (grille[pos].value !== grille[pos + tailleGrille * i - i].value) {
            gagne = false;
        }
    }
    return gagne;
}

let j = 0;

function boutonRejouer() {

    if (j < 1) {
        let bouton = document.createElement("button");
        let texteBouton = document.createTextNode("Cliquez ici pour Rejouer !");

        bouton.appendChild(texteBouton);
        document.body.appendChild(bouton);
        bouton.setAttribute("onclick", "rejouer()");
        bouton.setAttribute("display", "block");
        bouton.setAttribute("align", "center");

        j++;
    }
}

function rejouer() {

    supprGrille = document.getElementsByTagName("td");

    for (let i = 0; i < supprGrille.length; i++) {
        supprGrille[i].innerText = " ";
        nb = 0;
    }

    gagne = false;
    fin = false;
}