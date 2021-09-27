function diffType() {

    // let x = 0;

    x = 'blabla';
    affiche(x);

    x = "blabla";
    affiche(x);

    x = `blabla ${x}`;
    affiche(x);

    x = 9;
    affiche(x);

    x = 2.5;
    affiche(x);

    x = true;
    affiche(x);

    x = undefined;
    affiche(x);

    x = null;
    affiche(x);

    x = [1, 2, 3];
    affiche(x);

    x = new Array();
    affiche(x);

    x = {};
    affiche(x);

    x = { "promo": "lpwmce", "nb": 25 };
    affiche(x);

    x = new Date();
    affiche(x);

    x = function() { alert('toto') };
    affiche(x);

    var x = 0;
}

function affiche(x) {

    console.log(`${x } : ${ typeof x}`);
}

diffType();



function convType() {

    let a = 3;
    let b = a.toString();
    affiche(b);

    let c = parseInt(b);
    affiche(c);

    let d = Number.parseInt(b);
    affiche(d);

    let e = Number(b);
    affiche(e);

    let f = 2.5;
    let g = f.toString();
    affiche(g);

    let h = parseFloat(g);
    affiche(h);

    let i = Number.parseFloat(g);
    affiche(i);

    let j = Number(g);
    affiche(j);

    console.log(4.4, Math.floor(4.4));
    console.log(4.6, Math.floor(4.6));

    console.log(4.4, Math.ceil(4.4));
    console.log(4.6, Math.ceil(4.6));

    console.log(4.4, Math.round(4.4));
    console.log(4.6, Math.round(4.6));

    console.log(4.4, Math.trunc(4.4));
    console.log(4.6, Math.trunc(4.6));
}

convType();



function egalite() {

    let b = false;
    let n = 0;
    let s = '0';
    let tab = [];
    let o = {};

    function compare(u, v) {
        console.log(u == v);
    }

    function comparestrict(u, v) {
        console.log(u === v);
    }

    compare(b, n);
    compare(b, s);
    compare(b, tab);
    compare(b, o);

    compare(n, s);
    compare(n, tab);
    compare(n, o);

    compare(s, tab);
    compare(s, o);

    comparestrict(b, n);
    comparestrict(b, s);
    comparestrict(b, tab);
    comparestrict(b, o);

    comparestrict(n, s);
    comparestrict(n, tab);
    comparestrict(n, o);

    comparestrict(s, tab);
    comparestrict(s, o);
}

egalite();



function majuscule() {

    let chaine;

    do {
        chaine = prompt("Veuillez saisir une chaîne de caractère en majuscule");
    } while (chaine.toUpperCase() !== chaine);

    return chaine;
}

console.log(majuscule());



function genAleatoire() {

    let chaine;
    let nb = 0;

    do {
        chaine = "";
        for (let i = 0; i < 5; i++) {
            chaine += String.fromCharCode(65 + Math.random() * (123 - 65));
        }
        console.log(chaine);
        nb++;
    } while (chaine.toUpperCase() !== chaine);

    console.log(nb);
    return chaine;
}

genAleatoire();



function genAlphabet(taille) {

    let tabmin = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let tabmaj = [];

    tabmin.forEach(value => tabmaj.push(value.toUpperCase()));
    tabmin.push(...tabmaj);

    let chaine = '';

    for (let i = 0; i < taille; i++) {
        chaine += tabmin[parseInt(Math.random() * tabmin.length)];
    }

    return chaine;
}

console.log(genAlphabet(5));



function genVoyelle(taille) {

    let tabmin = ['a', 'e', 'i', 'o', 'u', 'y'];
    let tabmaj = [];

    tabmin.forEach(value => tabmaj.push(value.toUpperCase()));
    tabmin.push(...tabmaj);

    let chaine = '';

    for (let i = 0; i < taille; i++) {
        chaine += tabmin[parseInt(Math.random() * tabmin.length)];
    }

    return chaine;
}

console.log(genVoyelle(5));



function concatNom() {

    let nom = prompt("Veuillez saisir votre nom");
    let prenom = prompt("Veuillez saisir votre prenom")

    nom = nom.toUpperCase();
    prenom = prenom.toLowerCase();
    prenom = initialPrenom(prenom, ' ');
    prenom = initialPrenom(prenom, '-');

    console.log(nom + " " + prenom);
}

function initialPrenom(prenom, separateur) {

    let tab1 = prenom.split(separateur);
    let tab2 = [];

    tab1.forEach(value => tab2.push(value.substring(0, 1).toUpperCase() + value.substring(1)));
    return tab2.join(separateur);
}

concatNom();



function chaineCrypte() {

    let chaine = prompt("Veuillez saisir une chaîne à encrypter");

    console.log(chaine, "->", encryptage(chaine));
}

function encryptage(chaine) {

    let lettre = ['A', 'E', 'G', 'I', 'O', 'S', 'Z'];
    let chiffre = [4, 3, 6, 1, 0, 5, 2];

    for (let i = 0; i < lettre.length; i++) {
        chaine = chaine.replaceAll(lettre[i], chiffre[i])
        chaine = chaine.replaceAll(lettre[i].toLowerCase(), chiffre[i])
    }

    return chaine;
}

chaineCrypte();



function jazzBundle(n) {

    for (let i = 1; i <= n; i++) {

        let chaine = '';

        if (i % 3 === 0 || i % 5 === 0) {
            if (i % 3 === 0) {
                chaine = "Jazz ";
            }
            if (i % 5 === 0) {
                chaine += "Bundle";
            }
        } else {
            chaine = i;
        }

        console.log(chaine);
    }
}

jazzBundle(15);



function sommeAlgo(tab) {

    let somme = 0;

    for (let i = 0; i < tab.length; i++) {
        somme += tab[i];
    }

    return somme;
}

console.log(sommeAlgo([1, 2, 3, 4, 5]));



function sommeFonct(tab) {

    return tab.reduce((somme, n) => somme + n);
}

console.log(sommeFonct([1, 2, 3, 4, 5]));



function comptePairAlgo(tab) {

    let nb = 0;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] % 2 === 0) {
            nb++;
        }
    }

    return nb;
}

console.log(comptePairAlgo([1, 2, 3, 4, 5]));



function comptePairFonct(tab) {

    let nb = 0;

    tab.forEach(n => n % 2 === 0 ? nb++ : null);
    return nb;
}

console.log(comptePairFonct([1, 2, 3, 4, 5]));



function fusionTableau(tab1, tab2) {

    let n1 = tab1.length;
    let n2 = tab2.length;
    let i = 0;
    let i1 = 0;
    let i2 = 0;
    let tabfinal = [];

    while (i < n1 + n2) {

        if (i1 < n1 && i2 < n2) {

            if (tab1[i1] <= tab2[i2]) {
                tabfinal[i] = tab1[i1];
                i1++;

            } else {
                tabfinal[i] = tab2[i2];
                i2++;
            }

            i++;

        } else {

            if (i1 < n1) {
                tabfinal = [...tabfinal, ...tab1.slice(i1)];
            } else {
                tabfinal = [...tabfinal, ...tab2.slice(i2)]
            }

            i = tabfinal.length;
        }
    }

    return tabfinal;
}

console.log(fusionTableau([1, 3, 5], [2, 4, 6]));



function rechDicho(tab, n) {

    let position = -1;
    let debut = 0;
    let fin = tab.length - 1;

    while (debut <= fin && position === -1) {

        const moitie = Math.round((fin + debut) / 2);

        if (n === tab[moitie]) {
            position = moitie;
        } else if (n > tab[moitie]) {
            debut = moitie + 1;
        } else {
            fin = moitie - 1;
        }
    }

    return position;
}

console.log(rechDicho([1, 2, 3, 4, 5], 3));



function plusGrandPairAlgo(...tab) {

    let plusGrand = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] % 2 === 0 && tab[i] > plusGrand) {
            plusGrand = tab[i];
        }
    }

    return plusGrand;
}

console.log(plusGrandPairAlgo(1, 2, 3, 4, 5));



function plusGrandPairFonct(...tab) {

    let plusGrand = Number.MIN_SAFE_INTEGER;

    tab.forEach(
        n => {
            if (n % 2 === 0 && n > plusGrand) {
                plusGrand = n;
            }
        })

    return plusGrand;
}

console.log(plusGrandPairFonct(1, 2, 3, 4, 5));



function occurenceAlgo(chaine) {

    let tab = chaine.split(' ');
    let occurence = {};

    for (let i = 0; i < tab.length; i++) {
        if (Object.keys(occurence).includes(tab[i].toLowerCase())) {
            occurence[tab[i].toLowerCase()]++;
        } else {
            occurence[tab[i].toLowerCase()] = 1;
        }
    }

    return occurence;
}

console.log(occurenceAlgo("J ai terminé le td1 le td1 est terminé"));



function occurenceFonct(chaine) {

    let tab = chaine.split(' ');
    let occurence = {};

    tab.forEach(mot => {
        if (Object.keys(occurence).includes(mot.toLowerCase())) {
            occurence[mot.toLowerCase()]++;
        } else {
            occurence[mot.toLowerCase()] = 1;
        }
    });

    return occurence;
}

console.log(occurenceFonct("J ai terminé le td1 le td1 est terminé"));