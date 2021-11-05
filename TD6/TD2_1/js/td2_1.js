const exo1InsertArticle = (body) => {
    const titre = 'Article 0 - Interdiction absolue';
    const texte = "<span style='color:#000000;'>Il est absolument interdit de doubler Maxence GIRON, sous peine de disqualification immédiate.</span>";
    $('body').prepend('<h2>' + titre + '</h2> <p>' + texte + '</p>');
};

const exo2TitresMajuscule = (body) => {
    const lesH2 = $('h2');
    for (const unH2 of lesH2) {
        const ch = $(unH2).html();
        $(unH2).html(ch.toUpperCase());
    }
};

const exo3DecalerNumeros = (body) => {
    const lesH2 = $('h2');
    for (const unH2 of lesH2) {
        const ch = $(unH2).html().split(' ');
        const numero = ch[1]++;
        $(unH2).html(ch.join(' '));
    }
};

const exo4Styles = (body) => {
    const lesH2 = $('h2');
    for (let i = 0; i < lesH2.length; i++) {
        if (i % 2 === 1) {
            $(lesH2[i]).addClass('unsurdeux');
            $(lesH2[i]).next().addClass('unsurdeux');
        }
    }
};

const exo5ChangeDates = (body) => {
    const lesH2 = $('h2');
    const art4 = lesH2[3];
    let noeud = art4;
    while ($(noeud).prop('tagName') !== 'UL') {
        noeud = $(noeud).next();
    }

    const lesUL = [];
    let unUL;
    do {
        unUL = noeud;
        if ($(unUL).prop('tagName') === 'UL') {
            lesUL.push(unUL);
        }
        noeud = $(noeud).next();
    } while ($(unUL).prop('tagName') === 'UL');

    const pointInsertion = lesUL[0];
    for (let i = lesUL.length - 1; i >= 1; i--) {
        $(pointInsertion).before(lesUL[i]);
    }
};

exo1InsertArticle(document.body);
exo2TitresMajuscule(document.body);
exo3DecalerNumeros(document.body);
exo4Styles(document.body);
exo5ChangeDates(document.body);