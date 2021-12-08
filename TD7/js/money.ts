export class Money {
  private _currency!: string;
  private _amount!: number;
  private _rate!: number;

  constructor(currency: string, amount: number, rate: number) {
    this.currency = currency;
    this.amount = amount;
    this.rate = rate;
  }

  get currency(): string {
    return this._currency;
  }

  set currency(currency: string) {
    if (currency.length == 3) {
      this._currency = currency;
    } else {
      throw new Error('Currency name is a 3-letters code.');
    }
  }

  set amount(amount: number) {
    if (amount >= 0) {
      this._amount = amount;
    } else {
      throw new Error('Amount should be a positive number!');
    }
  }

  get amount(): number {
    return this._amount;
  }

  set rate(rate: number) {
    if (rate >= 0) {
      this._rate = rate;
    } else {
      throw new Error('Rate should be a positive number!');
    }
  }

  get rate(): number {
    return this._rate;
  }

  getEuroValue(): number {
    return this._amount / this._rate;
  }

  addValue(amount: number): void {
    if (amount > 0) {
      this._amount += amount;
    } else {
      throw new Error('Amount to add should be a positive number!');
    }
  }

  withdrawValue(amount: number): boolean {
    if (amount > 0) {
      if (amount <= this._amount) {
        this._amount -= amount;
        return this._amount === 0;
      }
      throw new Error('Not enough money in this currency!');
    } else {
      throw new Error('Amount to withdraw should be a positive number!');
    }
  }

  toString(): string {
    return (
      this._amount +
      ' ' +
      this._currency +
      ' (' +
      this.getEuroValue() +
      ' euros)'
    );
  }
}
