export class Wallet {
    constructor() {
        this.moneyList = [];
    }
    set moneyList(list) {
        this._moneyList = list;
    }
    get moneyList() {
        return this._moneyList;
    }
    addMoney(money) {
        const position = this.moneyAlreadyInWallet(money);
        if (position === false) {
            this._moneyList.push(money);
        } else {
            this._moneyList[position].addValue(money.amount);
        }
    }
    withdrawMoney(money) {
        const position = this.moneyAlreadyInWallet(money);
        if (position === false) {
            throw new Error("You don't have this currency in youy wallet!");
        } else {
            const nothingRemains = this._moneyList[position].withdrawValue(money.amount);
            if (nothingRemains) {
                this._moneyList.splice(position, 1);
            }
        }
    }
    moneyAlreadyInWallet(money) {
        for (let i = 0; i < this._moneyList.length; i++) {
            if (this._moneyList[i].currency === money.currency) {
                return i;
            }
        }
        return false;
    }
    getTotal() {
        let total = 0;
        this._moneyList.forEach((value) => {
            total += value.getEuroValue();
        });
        return total;
    }
    toString() {
        let content = "";
        this._moneyList.forEach((value) => {
            content += value.toString() + ";";
        });
        return content;
    }
}
//# sourceMappingURL=wallet.js.map