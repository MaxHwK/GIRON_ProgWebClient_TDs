import { Wallet } from "./wallet.js";
import { Money } from "./money.js";
import { getRate } from "./mycurrencyutils.js";
import { fetchRates } from "./mycurrencyutils.js";
// on remplit le select des devises
// la fonction renvoie soit une donnée du localStorage, soit une donnée en cours d'arrivage (fetch !)
const select_currency = document.getElementById("currency_list");
const promiseOrData = fetchRates();
if (promiseOrData instanceof Promise) {
    promiseOrData.then((currencyValues) => {
        buildCurrencySelect(currencyValues);
    });
} else {
    buildCurrencySelect(promiseOrData);
}

function buildCurrencySelect(currencyValues) {
    let options = "";
    Object.keys(currencyValues.rates).forEach((value) => {
        options += "<option value='" + value + "'>" + value + "</option>";
    });
    select_currency.innerHTML = options;
    // sélection de la devise par défaut
    select_currency.value = "EUR";
}
// listeners sur les deus boutons d'ajout/retrait
const btn_add = document.getElementById("btn_deposit");
const btn_wd = document.getElementById("btn_withdraw");
btn_add.addEventListener("click", () => deposit());
btn_wd.addEventListener("click", () => withdraw());
// la zone d'alerte pour les erreurs
const error_zone = document.getElementById("error-message");
// Création du portefeuille
const myWallet = new Wallet();
// dépôt d'argent
function deposit() {
    try {
        const m = buildMoneyFromView();
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
function withdraw() {
    try {
        const m = buildMoneyFromView();
        myWallet.withdrawMoney(m);
        error_zone.style.visibility = "hidden";
        buildWallet();
        updateTotal();
    } catch (exception) {
        error_zone.innerText = exception;
        error_zone.style.visibility = "visible";
    }
}

function buildMoneyFromView() {
    const input_amount = document.getElementById("amount");
    const currency = select_currency.value;
    const amount = input_amount.value;
    const value = parseFloat(amount);
    return new Money(currency, value, getRate(currency));
}
// (ré)affichage de la table montrant le contenu du portefeuille
function buildWallet() {
    const tBody = document.getElementById("wallet-tbody");
    tBody.innerHTML = "";
    myWallet.moneyList.forEach((money) => {
        const tr = tBody.insertRow(-1);
        let myTR = "<td>" + money.currency + "</td>";
        myTR += "<td>" + money.amount + "</td>";
        tr.innerHTML = myTR;
    });
}
// Mise à jour du total contenu dans le portefeuille
function updateTotal() {
    const total = document.getElementById("total_wallet");
    total.innerText = "" + Math.round((myWallet.getTotal() + Number.EPSILON) * 100) / 100;
}
//# sourceMappingURL=usewallet.js.map