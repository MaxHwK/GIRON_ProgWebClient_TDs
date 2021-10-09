import * as arrayutils from "./array_utils.js";

function utilise() {

    let tab = [];
    let nb;
    let nbp;
    let rechNombre;

    do {

        nb = prompt("Veuillez saisir un nombre (0 pour annuler)");
        nbp = parseInt(nb);
        tab.push(nbp);

    } while (nb !== "0")

    rechNombre = prompt("Veuillez saisir le nombre à rechercher");

    console.log(tab);
    console.log(arrayutils.somme(tab));
    console.log(arrayutils.comptePair(tab));
    console.log(arrayutils.plusGrandPair(...tab));
    console.log(arrayutils.rechDicho(tab, rechNombre));
}

//utilise();



function ajoutElement() {

    let elements = document.getElementsByClassName("elements");
    let cloneElement = elements[elements.length - 1];

    let nouvElement = document.createElement("div");
    nouvElement.innerHTML = cloneElement.innerHTML;
    nouvElement.setAttribute("class", "elements");
    nouvElement.children[0].innerHTML = "Elément " + (elements.length + 1);

    let boutonAjout = document.getElementById("ajout");
    document.getElementById("principal").insertBefore(document.createElement("br"), boutonAjout);
    document.getElementById("principal").insertBefore(nouvElement, boutonAjout);
}

document.getElementById("ajout").addEventListener("click", ajoutElement);

function affichResultat() {

    let compte = 0;
    let tab = [];
    let j = 0;
    let inputElement = document.getElementsByClassName("inputElement");

    for (j = 0; j < inputElement.length; j++) {
        if (inputElement[j].value !== "") {
            tab.push(inputElement[j].value);
        }
    }

    let rechNombre = document.getElementById("recherche").value;

    if (tab.length !== 0 && rechNombre !== "") {

        if (compte === 0) {

            let divResultat = document.createElement("div");
            let divFin = document.getElementById("principal");
            divResultat.setAttribute("Id", "divResultat");

            let divParent = divFin.parentNode;
            divParent.insertBefore(divResultat, divFin.nextSibling);

            let label1 = "Somme des éléments : ";
            let label2 = "Nombre de pairs : ";
            let label3 = "Plus grand élément pair : ";
            let label4 = "Position de l'élément dans la table : ";

            let p1 = document.createElement("p");
            p1.innerHTML = label1 + arrayutils.somme(tab);
            divResultat.appendChild(p1);

            let p2 = document.createElement("p");
            p2.innerHTML = label2 + arrayutils.comptePair(tab);
            divResultat.appendChild(p2);

            if (arrayutils.plusGrandPair(...tab) % 2 === 0) {
                let p3 = document.createElement("p");
                p3.innerHTML = label3 + arrayutils.plusGrandPair(...tab);
                divResultat.appendChild(p3);
            } else {
                let p3 = document.createElement("p");
                p3.innerHTML = label3 + "Pas de pairs dans la table !";
                divResultat.appendChild(p3);
            }

            let p4 = document.createElement("p");
            p4.innerHTML = label4 + arrayutils.rechDicho(tab, rechNombre);
            divResultat.appendChild(p4);
            compte++;
        }
    }
}

document.getElementById("prodResultat").addEventListener("click", affichResultat);