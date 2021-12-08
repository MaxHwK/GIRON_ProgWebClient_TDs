import {Money} from "./money"

export class Wallet {

    private _moneyList! :  Money[];

    constructor() {
        this.moneyList = [];
    }

    set moneyList(list : Money[]) {

        this._moneyList = list;
    }

    get moneyList() : Money[] {

        return this._moneyList;
    }
    
    addMoney(money : Money) : void {

        const position : number | boolean = this.moneyAlreadyInWallet(money);
         if (position === false) {
             this._moneyList.push(money);
         } else {
             this._moneyList[(position as number)].addValue(money.amount);
         }
    }

    withdrawMoney(money : Money) : void {

        const position : number | boolean = this.moneyAlreadyInWallet(money);
        if (position === false) {
            throw new Error("You don't have this currency in youy wallet!")
        } else {
            const nothingRemains : boolean = this._moneyList[(position as number)].withdrawValue(money.amount);
            if (nothingRemains) {
                this._moneyList.splice((position as number), 1);
            }
        }
    }

    moneyAlreadyInWallet(money : Money) : number | boolean {

        for (let i : number = 0; i < this._moneyList.length; i++) {
            if (this._moneyList[i].currency === money.currency) {
                return i;
            }
        }
        return false;
    }

    getTotal() : number {

        let total : number = 0;
        this._moneyList.forEach(
            (value : Money) => {
                total += value.getEuroValue();
            }
        )
        return total;
    }

    toString() : string {

        let content : string = "";
        this._moneyList.forEach(
            (value: Money) => {
                content += value.toString() + ";"
            }
        )

        return content;
    }

}