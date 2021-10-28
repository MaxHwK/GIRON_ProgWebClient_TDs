// J'ai essayé d'utiliser Leaflet pour réaliser le 3ème et dernier point du TP, sans succès.
// J'ai tout de même fait le choix de laisser les quelques traces de mon travail.

let recupCom = document.getElementById("commune");
let recupTempera = document.getElementById("temperature");
let recupTemps = document.getElementById("temps");
let recupRessenti = document.getElementById("ressenti");
let recupTempMin = document.getElementById("tempmin");
let recupTempMax = document.getElementById("tempmax");
let recupHumidite = document.getElementById("humidite");
let commune = JSON.parse(localStorage.getItem("selectCom"));

let carte = L.map("carte").setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(carte);

let recupMeteo = async(point) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?lon=" + point[0] + "&lat=" + point[1] + "&appid=ca148ad7bef8c68bdfa690d8101219ad&units=metric&lang=fr", {
            "method": "GET",
        })
        .then(async reponse => {
            reponse.json().then(reponse => {
                afficheMeteo(reponse);
            })
        })
        .catch(erreur => {
            console.log(erreur);
        });
}

let afficheMeteo = (com) => {
    recupCom.innerHTML = commune.nom;
    recupTempera.innerHTML = com.main.temp;
    recupTemps.innerHTML = com.weather[0].description;
    recupRessenti.innerHTML = com.main.feels_like;
    recupTempMin.innerHTML = com.main.temp_min;
    recupTempMax.innerHTML = com.main.temp_max;
    recupHumidite.innerHTML = com.main.humidity;
}

let tracetCarte = (point, trait) => {
    carte.panTo(new L.LatLng(point[0], point[0]));
    recupMeteo(point);
    L.geoJson(trait).addTo(carte);
}

let afficheCarte = async() => {
    fetch("https://geo.api.gouv.fr/communes?code=" + commune.code + "&fields=code,nom,centre,trait", {
            "method": "GET",
        })
        .then(reponse => {
            reponse.json().then(reponse => {
                tracetCarte(reponse[0]["centre"]["coordinates"], reponse[0]["trait"]);
            })
        })
        .catch(erreur => {
            console.log(erreur);
        });
}

await afficheCarte();