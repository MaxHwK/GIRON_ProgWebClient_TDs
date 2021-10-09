export function somme(tab) {

    let somme = 0;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] == parseFloat(Math.floor(tab[i]))) {
            somme = somme + parseFloat(tab[i]);
        }
    }

    return somme;
}



export function comptePair(tab) {

    let nb = 0;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] % 2 === 0) {
            nb++;
        }
    }

    return nb;
}



export function plusGrandPair(...tab) {

    let plusGrand = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] % 2 === 0 && tab[i] > plusGrand) {
            plusGrand = tab[i];
        }
    }

    return plusGrand;
}



export function rechDicho(tab, n) {

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