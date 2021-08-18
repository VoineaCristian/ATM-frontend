import {Stacks} from "../stacks/stacks";

export class Money {

  currency: string;
  stacks: Stacks[];

  constructor(currency: string, stacks: Stacks[]) {
    this.currency = currency;
    this.stacks = stacks;
  }


}
