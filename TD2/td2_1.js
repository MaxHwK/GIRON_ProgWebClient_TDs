let titreArt = document.createElement("h2");
titreArt.innerHTML = "Article 0 - Disqualification";

let haut = document.firstElementChild.lastElementChild;
console.log(haut);

let enfant = document.firstElementChild.lastElementChild.firstElementChild;
haut.insertBefore(titreArt, enfant);

let article = document.createElement("p");
article.innerHTML = "Il est interdit de doubler Maxence GIRON, sous peine de disqualification.";
document.getElementsByTagName("h2")[0].after(article);



let h2maj = document.getElementsByTagName("h2");
console.log(h2maj);

for (let i = 0; i < h2maj.length; i++) {

    h2maj[i].innerHTML = h2maj[i].innerHTML.toUpperCase();
}



for (let i = 0; i < h2maj.length; i++) {

    let nbArt = h2maj[i].innerHTML.split(" ");
    console.log(nbArt);

    let decalage = ++nbArt[1];
    console.log(decalage);

    h2maj[i].innerHTML = nbArt.join(" ");
    console.log((h2maj[i].innerHTML = nbArt.join(" ")));
}



for (let couleur = 1; couleur < h2maj.length; couleur = couleur + 2) {

    h2maj[couleur] = h2maj[couleur].style.backgroundColor = "orange";

    var artSuivant = h2maj[couleur].nextElementSibling;
    artSuivant = artSuivant.style.backgroundColor = "orange";
}



let periode1 = document.getElementsByTagName("ul")[0].firstElementChild.firstElementChild;
console.log(periode1.outerHTML);

let periode2 = document.getElementsByTagName("ul")[2].firstElementChild.firstElementChild;
console.log(periode2.outerHTML);

let inverse1 = document.getElementsByTagName("ul")[0].firstElementChild;
inverse1.insertBefore(periode2, periode1);

let inverse2 = document.getElementsByTagName("ul")[2].firstElementChild;
let epreuve = document.getElementsByTagName("p")[9];
inverse2.insertBefore(periode1, epreuve);