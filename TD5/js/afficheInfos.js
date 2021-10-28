let recupIdRegion = document.getElementById("region");
let recupIdDpt = document.getElementById("departement");
let recupIdCom = document.getElementById("commune");
let infosCommunes = document.getElementById("infosCommunes");

let afficheRegion = async(affichage) => {
    affichage.innerHTML = '';

    fetch('https://geo.api.gouv.fr/regions', {
            method: 'GET',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(reponse => {
            reponse.json().then(reponse => {
                localStorage.setItem("Region", JSON.stringify(reponse));

                let premRegion = reponse[0];
                let promDpt;
                promDpt = afficheDpt(recupIdDpt, premRegion.code);

                reponse.forEach(e => {
                    let optionRegion = document.createElement('option');
                    optionRegion.value = e.code;
                    optionRegion.innerHTML = e.nom;
                    affichage.append(optionRegion);
                });

                reponse;
            })

        }).catch(erreur => console.log(erreur));
}

let afficheDpt = async(affichage, region) => {
    affichage.innerHTML = '';

    fetch('https://geo.api.gouv.fr/regions/' + region + '/departements', {
            method: 'GET',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(reponse => {
            reponse.json().then(reponse => {
                localStorage.setItem("Departement", JSON.stringify(reponse));

                let premDpt = reponse[0];
                let promCom;
                promCom = afficheCom(recupIdCom, premDpt.code);

                reponse.forEach(e => {
                    let optionDpt = document.createElement('option');
                    optionDpt.value = e.code;
                    optionDpt.innerHTML = e.nom;
                    affichage.append(optionDpt);
                });

                reponse;
            })

        }).catch(erreur => console.log(erreur));
}

let afficheInfosCom = (premCom, e) => {
    infosCommunes.innerHTML = '';

    let tab = [];
    let code = premCom.codesPostaux[0];

    let population = document.getElementById("population");
    population.innerHTML = premCom.population;

    let compte = 0;

    tab = e.filter(Commune =>
        Commune.codesPostaux[0].includes(code)
    );

    tab.forEach(e => {
        if (e != []) {
            let ligne = document.createElement("tr");
            let colNom = document.createElement("td");
            let colCode = document.createElement("td");
            let colPopu = document.createElement("td");

            colNom.innerHTML = e.nom;
            colCode.innerHTML = e.codesPostaux[0];
            colPopu.innerHTML = e.population;

            ligne.append(colNom, colCode, colPopu);
            infosCommunes.append(ligne);

            compte += e.population;
        }
    });

    let popuTotale = document.getElementById("popuTotale");
    popuTotale.innerHTML = parseInt(compte);
}

let afficheCom = async(affichage, departement) => {
    affichage.innerHTML = '';

    fetch('https://geo.api.gouv.fr/departements/' + departement + '/communes', {
            method: 'GET',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(reponse => {
            reponse.json().then(reponse => {
                localStorage.setItem("Communes", JSON.stringify(reponse));

                let premCom = reponse[0];
                localStorage.setItem("selectCom", JSON.stringify(premCom));
                afficheInfosCom(premCom, reponse);

                reponse.forEach(e => {
                    let optionCom = document.createElement('option');
                    optionCom.value = e.code;
                    optionCom.innerHTML = e.nom;
                    affichage.append(optionCom);
                });

                reponse;
            })

        }).catch(erreur => console.log(erreur));
}

let promRegion = await afficheRegion(recupIdRegion);

recupIdRegion.onchange = () => {
    let region = recupIdRegion.value;
    afficheDpt(recupIdDpt, region);
}

recupIdDpt.onchange = () => {
    let departement = recupIdDpt.value;
    afficheCom(recupIdCom, departement);
}

recupIdCom.onchange = () => {
    let communes = JSON.parse(localStorage.getItem("Communes"));
    let commune = communes.filter(commune => commune.code === recupIdCom.value);
    localStorage.setItem("selectCom", JSON.stringify(commune[0]));
    afficheInfosCom(commune[0], communes);
}

function videSelect() {
    localStorage.clear();
}