export class Money {
    constructor(currency, amount, rate) {
        this.currency = currency;
        this.amount = amount;
        this.rate = rate;
    }
    get currency() {
        return this._currency;
    }
    set currency(currency) {
        if (currency.length == 3) {
            this._currency = currency;
        } else {
            throw new Error("Currency name is a 3-letters code.");
        }
    }
    set amount(amount) {
        if (amount >= 0) {
            this._amount = amount;
        } else {
            throw new Error("Amount should be a positive number!");
        }
    }
    get amount() {
        return this._amount;
    }
    set rate(rate) {
        if (rate >= 0) {
            this._rate = rate;
        } else {
            throw new Error("Rate should be a positive number!");
        }
    }
    get rate() {
        return this._rate;
    }
    getEuroValue() {
        return this._amount / this._rate;
    }
    addValue(amount) {
        if (amount > 0) {
            this._amount += amount;
        } else {
            throw new Error("Amount to add should be a positive number!");
        }
    }
    withdrawValue(amount) {
        if (amount > 0) {
            if (amount <= this._amount) {
                this._amount -= amount;
                return (this._amount === 0);
            }
            throw new Error("Not enough money in this currency!");
        } else {
            throw new Error("Amount to withdraw should be a positive number!");
        }
    }
    toString() {
        return this._amount + " " + this._currency + " (" + this.getEuroValue() + " euros)";
    }
}
//# sourceMappingURL=money.js.map