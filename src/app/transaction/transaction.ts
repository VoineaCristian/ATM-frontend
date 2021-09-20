import {Stacks} from "../stacks/stacks";

export class Transaction {
  id: number;
  date: Date;
  amount: number;
  transactionType: string;
  stacks: Stacks[];


  constructor(id: number, date: Date, amount: number, transactionType: string, stacks: Stacks[]) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.transactionType = transactionType;
    this.stacks = stacks;
  }
}
