import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Account} from "../account/account";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  username: string;
  selectedItem: Account;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  getBalance(): Observable<any> {
    console.log(this.username);
    return this.httpClient.get('/api/atm/balance?username=' + this.route.snapshot.paramMap.get('username'));
  }
}
