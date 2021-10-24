fetch('https://geo.api.gouv.fr/regions', {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(reponse => reponse.json())
    .then(function(donnees) {
        let regionSelect = document.getElementById("region");
        let regions = donnees;

        regions.map(function(region) {
            let regionOption = document.createElement("option");
            regionOption.setAttribute("value", `${region.code}`);
            regionOption.innerHTML = `${region.nom}`
            regionSelect.appendChild(regionOption);
        });
    })
    .catch(erreur => console.log(erreur));

function afficheRegion() {
    let codeRegion = document.getElementById("region").value;

    fetch('https://geo.api.gouv.fr/regions/' + codeRegion + '/departements', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(reponse => reponse.json())
        .then(function(donnees) {
            let regionSelect = document.getElementById("region");
            let dptSelect = document.getElementById("departement");
            let regionCode = regionSelect.value;
            let departements = donnees;

            departements.map(function(departement) {
                let dptOption = document.createElement("option");
                dptOption.setAttribute("value", `${departement.code}`);
                dptOption.innerHTML = `${departement.nom}`;
                dptOption.setAttribute("class", `${departement.codeRegion}`);
                dptSelect.appendChild(dptOption);
            });

            let compte = dptSelect.childElementCount;

            if (dptSelect.compte !== 0) {
                for (let i = 0; i < compte; i++) {
                    if (dptSelect.children[0].className != regionCode) {
                        dptSelect.removeChild(dptSelect.firstChild);
                    }
                }
            }

            afficheDpt();
        })
        .catch(erreur => console.log(erreur));
}

function afficheDpt() {
    let dptSelect = document.getElementById("departement");
    let dptCode = dptSelect.value;
    let codeDepartement = document.getElementById("departement").value;

    fetch('https://geo.api.gouv.fr/departements/' + codeDepartement + '/communes', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(reponse => reponse.json())
        .then(function(donnees) {
            let comSelect = document.getElementById("commune");
            let communes = donnees;

            communes.map(function(commune) {
                let comOption = document.createElement("option");
                comOption.setAttribute("value", `${commune.code}`);
                comOption.setAttribute("class", `${commune.codeDepartement}`);
                comOption.innerHTML = `${commune.nom}`
                comSelect.appendChild(comOption);
            });

            let compte = comSelect.childElementCount;

            if (compte !== 0) {
                for (let i = 0; i < compte; i++) {
                    if (comSelect.children[0].className != dptCode) {
                        comSelect.removeChild(comSelect.firstChild);
                    }
                }
            }

            afficheCom();
        })
        .catch(erreur => console.log(erreur));
}

function afficheCom() {
    let comSelect = document.getElementById("commune");

    fetch('https://geo.api.gouv.fr/communes', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(reponse => reponse.json())
        .then(function(donnees) {
            let popuSpan = document.getElementById("population");
            let communes = donnees;
            let commune = communes.filter(function(popu) {
                if (popu.code != comSelect.value) {
                    return false;
                } else {
                    return true;
                }
            })

            console.log(commune);

            if (commune[0].population) {
                popuSpan.innerHTML = commune[0].population + " habitants.";
            }

            let comParCode = communes.filter(function(el) {
                for (let i = 0; i < commune[0].codesPostaux.length; i++) {
                    if (el.codesPostaux[0] === commune[0].codesPostaux[i]) {
                        return true;
                    }
                }
            });

            console.log(comParCode);

            let tabCommunes = document.getElementById("tabCommunes");

            for (let i = 0; i < comParCode.length; i++) {
                let ligne = document.createElement("tr");
                let colNom = document.createElement("td");
                let colCode = document.createElement("td");
                let colPopu = document.createElement("td");

                colNom.innerHTML = comParCode[i].nom;
                colCode.innerHTML = comParCode[i].codesPostaux[0];
                colPopu.innerHTML = comParCode[i].population;

                ligne.appendChild(colNom);
                ligne.appendChild(colCode);
                ligne.appendChild(colPopu);
                ligne.setAttribute("class", comParCode[i].codesPostaux[0]);
                tabCommunes.appendChild(ligne);
            }

            let compte = tabCommunes.childElementCount;

            if (compte != 0) {
                for (let i = 0; i < compte; i++) {
                    if (tabCommunes.firstElementChild.className != comParCode[0].codesPostaux[0]) {
                        tabCommunes.removeChild(tabCommunes.firstElementChild);
                    }
                }
            }

            let popuTotale = 0;
            let popuTotaleSpan = document.getElementById("popuTotale");

            for (let i = 0; i < tabCommunes.children.length; i++) {
                let popuId = parseFloat(tabCommunes.children[i].children[2].innerHTML);
                popuTotale += popuId;
            }

            popuTotaleSpan.innerHTML = popuTotale + " habitants.";
        })
        .catch(erreur => console.log(erreur));
}

function afficheMeteo() {
    let commune = document.getElementById("commune");
    let communeCode = commune.options[commune.selectedIndex].innerHTML;
    localStorage.clear();
    localStorage.setItem("codeville", communeCode);
    window.location.href = "./meteo.html";
}

function videSelect() {
    localStorage.clear();
}