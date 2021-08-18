import {Transaction} from '../transaction/transaction';

export class Account {
    id: number;
    sold: number;
    currency: string;
    transactions: Transaction[];
    cvv: string;
    cardNumber: string;
    expirationDate: string;


  constructor(sold: number, currency: string, transactions: Transaction[], cvv: string, cardNumber: string, expirationDate: string) {
    this.id = null;
    this.sold = sold;
    this.currency = currency;
    this.transactions = transactions;
    this.cvv = cvv;
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }
}
