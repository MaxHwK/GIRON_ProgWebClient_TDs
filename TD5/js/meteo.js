function afficheMeteo() {
    console.log('https://api.openweathermap.org/data/2.5/weather?' +
        'q=' + localStorage.getItem("codeville") + ',' +
        'fr&' +
        'APPID=b06fab36ada1e6a3c5611f818af322af');

    fetch('https://api.openweathermap.org/data/2.5/weather?' +
            'q=' + localStorage.getItem("codeville") + ',' +
            'fr&' +
            'APPID=b06fab36ada1e6a3c5611f818af322af', {
                method: "GET",
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
        .then(reponse => reponse.json())
        .then(reponse => console.log(reponse))
        .catch(erreur => console.log(erreur));
}