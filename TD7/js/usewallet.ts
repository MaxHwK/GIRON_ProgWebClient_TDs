import {Wallet} from "./wallet.js";
import {Money} from "./money.js";
import {getRate} from "./mycurrencyutils.js";
import {fetchRates} from "./mycurrencyutils.js";

// on remplit le select des devises
// la fonction renvoie soit une donnée du localStorage, soit une donnée en cours d'arrivage (fetch !)

const select_currency : HTMLSelectElement = (document.getElementById("currency_list") as HTMLSelectElement);

const promiseOrData : Promise<Response> | any = fetchRates();
if (promiseOrData instanceof Promise) {
    promiseOrData.then(
        (currencyValues : any) => {
            buildCurrencySelect(currencyValues);
        }
    );
} else {
    buildCurrencySelect(promiseOrData);
}

function buildCurrencySelect(currencyValues: any) : void {
    let options: string = "";
    Object.keys(currencyValues.rates).forEach( (value: string) => {
        options += "<option value='" + value + "'>" + value + "</option>";
    });
    select_currency.innerHTML = options;
    // sélection de la devise par défaut
    select_currency.value = "EUR";
}

// listeners sur les deus boutons d'ajout/retrait
const btn_add : HTMLButtonElement = (document.getElementById("btn_deposit") as HTMLButtonElement);
const btn_wd : HTMLButtonElement = (document.getElementById("btn_withdraw") as HTMLButtonElement);
btn_add.addEventListener("click", () => deposit());
btn_wd.addEventListener("click", () => withdraw());

// la zone d'alerte pour les erreurs
const error_zone : HTMLDivElement = (document.getElementById("error-message") as HTMLDivElement);

// Création du portefeuille
const myWallet = new Wallet();

// dépôt d'argent
function deposit() : void {

    try {
        const m: Money = buildMoneyFromView();
        myWallet.addMoney(m);
        error_zone.style.visibility = "hidden";
        buildWallet();
        updateTotal();
    } catch (exception) {
        error_zone.innerText = exception;
        error_zone.style.visibility = "visible";
    }
}

// retrait d'argent
function withdraw() : void {

    try {
        const m: Money = buildMoneyFromView();
        myWallet.withdrawMoney(m);
        error_zone.style.visibility = "hidden";
        buildWallet();
        updateTotal();
    } catch (exception) {
        error_zone.innerText = exception;
        error_zone.style.visibility = "visible";
    }
}

function buildMoneyFromView() : Money {

    const input_amount : HTMLInputElement = (document.getElementById("amount") as HTMLInputElement);

    const currency: string = select_currency.value;
    const amount: string = input_amount.value;
    const value: number = parseFloat(amount);

    return new Money(currency, value, getRate(currency));
}

// (ré)affichage de la table montrant le contenu du portefeuille
function buildWallet() : void {

    const tBody : HTMLTableSectionElement = (document.getElementById("wallet-tbody") as HTMLTableSectionElement);
    tBody.innerHTML = "";
    myWallet.moneyList.forEach( (money: Money) => {
        const tr : HTMLTableRowElement = tBody.insertRow(-1);
        let myTR : string = "<td>" + money.currency + "</td>";
        myTR += "<td>" + money.amount + "</td>";
        tr.innerHTML = myTR;
    });
}

// Mise à jour du total contenu dans le portefeuille
function updateTotal() : void {

    const total : HTMLSpanElement = (document.getElementById("total_wallet") as HTMLSpanElement);
    total.innerText = "" + Math.round((myWallet.getTotal()  + Number.EPSILON) * 100) / 100;

}