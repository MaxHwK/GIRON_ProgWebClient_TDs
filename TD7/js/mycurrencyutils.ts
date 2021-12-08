export function fetchRates() : Promise<Response> | any {

    const today : Date = new Date();

    if (localStorage.getItem("rates") == null || localStorage.getItem("ratesDate")!==today.toDateString()) {
        return fetch("https://api.exchangeratesapi.io/latest",
            {
                method: 'GET',
            })
            .then(function (response: Response) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json: any) {
                        json.rates.EUR = 1;
                        localStorage.setItem("rates", JSON.stringify(json));
                        localStorage.setItem("ratesDate", today.toDateString());
                        return json;
                    });
                }
                return null;
            })
            .catch(function (error: any) {
                console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
            });
    } else {
        return JSON.parse(localStorage.getItem("rates")!);
    }

}

export function getRate(currency: string): number {
    
    return Number.parseFloat(JSON.parse(localStorage.getItem("rates")!).rates[currency]);
}