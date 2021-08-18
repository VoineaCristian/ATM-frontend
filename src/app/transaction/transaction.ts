export class Transaction {
  id: number;
  date: Date;
  amount: number;
  transactionType: string;


  constructor(id: number, date: Date, amount: number, transactionType: string) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.transactionType = transactionType;
  }
}
