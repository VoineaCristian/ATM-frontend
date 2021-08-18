import {Money} from "../money/money";

export class MoneyContainer {
  moneys: Money[];
  nrOfElements: number;


  constructor(moneys: Money[], nrOfElements: number) {
    this.moneys = moneys;
    this.nrOfElements = nrOfElements;
  }
}
