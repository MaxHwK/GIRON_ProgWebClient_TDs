import * as arrayutils from "./array_utils.js";

function utilise() {

    let tab = [];
    let nb;
    let nbp;
    let n;

    do {

        nb = prompt("Veuillez saisir un nombre (0 pour annuler)");
        nbp = parseInt(nb);
        tab.push(nbp);

    } while (nb !== "0")

    n = prompt("Veuillez saisir le nombre à rechercher");

    console.log(tab);
    console.log(arrayutils.somme(tab));
    console.log(arrayutils.comptePair(tab));
    console.log(arrayutils.plusGrandPair(...tab));
    console.log(arrayutils.rechDicho(tab, n));
}

//utilise();



let nbElement = 2;
let idElement = 0;
let calcul = 0;

function ajouterNombre() {

    let element = "Elément " + nbElement++ + " <input type=\"number\" id=\"number" + idElement + "\">";
    let nouvP = document.createElement("p");
    nouvP.innerHTML = element;

    let nouvNombre = document.getElementById("ajout");
    let divParent = nouvNombre.parentNode;

    divParent.insertBefore(nouvP, nouvNombre);
    idElement++;
}

function affichResultat() {

    let tab = [];
    let j = 0;
    tab[j] = document.getElementById("number").value;

    for (j = 0; j < idElement; j++) {
        tab[j + 1] = document.getElementById("number" + j).value;
    }

    let rechNombre = document.getElementById("recherche").value;

    if (tab.length !== 0 && rechNombre !== "") {

        if (calcul === 0) {

            let divFinale = document.createElement("div");
            let endDiv = document.getElementById("principal");
            divFinale.setAttribute("Id", "divFinale")

            let divParent = endDiv.parentNode;
            divParent.insertBefore(divFinale, endDiv.nextSibling);

            let label1 = "Somme des éléments : ";
            let label2 = "Nombre de pairs : ";
            let label3 = "Plus grand élément pair : ";
            let label4 = "Position de l'élément dans la table : ";

            let p1 = document.createElement("p");
            p1.innerHTML = label1 + arrayutils.somme(tab);
            divFinale.appendChild(p1);

            let p2 = document.createElement("p");
            p2.innerHTML = label2 + arrayutils.comptePair(tab);
            divFinale.appendChild(p2);

            if (arrayutils.plusGrandPair(...tab) % 2 === 0) {
                let p3 = document.createElement("p");
                p3.innerHTML = label3 + arrayutils.plusGrandPair(...tab);
                divFinale.appendChild(p3);
            } else {
                let p3 = document.createElement("p");
                p3.innerHTML = label3 + "Pas de pairs dans la table !";
                divFinale.appendChild(p3);
            }

            let p4 = document.createElement("p");
            p4.innerHTML = label4 + arrayutils.rechDicho(tab, rechNombre);
            divFinale.appendChild(p4);
            calcul++;
        }
    }
}

document.querySelector('#produirRes').addEventListener('click', affichResultat);
document.querySelector('#ajout').addEventListener('click', ajouterNombre);