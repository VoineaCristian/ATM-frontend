import {Account} from './account';

export class AccountContainer {
  accounts: Account[];
  nrOfElements: number;


  constructor(accounts: Account[], nrOfElements: number) {
    this.accounts = accounts;
    this.nrOfElements = nrOfElements;
  }
}
