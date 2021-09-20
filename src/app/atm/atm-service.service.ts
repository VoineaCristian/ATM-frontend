import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Stacks} from "../stacks/stacks";
import {Money} from "../money/money";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtmServiceService {

  constructor(private httpClient: HttpClient) {}

  deposit(money: Money, username: string, accountId: number){
    return this.httpClient.post('/api/deposit/' + accountId, money);
  }
  withdraw(username: string, accountId: number, amount :number){
    return this.httpClient.post('/api/withdraw/' + accountId + "?value=" + amount,{},{responseType: 'text', observe: 'response'});
  }
  getNotes(currency: string): Observable<any>{
    return this.httpClient.get('/api/getNotes/' + "?currency=" + currency);
  }
  refill(money:Money, username: string): Observable<any>{
    return this.httpClient.post('/api/atm/refill', money);
  }
}
