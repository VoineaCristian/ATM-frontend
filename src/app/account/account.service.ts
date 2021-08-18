import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Account} from "./account";

@Injectable()
export class AccountService {
  username: string;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
  }
  getAccounts(): Observable<any> {
    console.log(this.username);

    return this.httpClient.get('/api/accounts/');
  }
  addAccounts(account: Account, username: string): Observable<any> {
    console.log(this.username);
    return this.httpClient.post('/api/accounts/' + username , account);
  }
  deleteAccount(account: Account, username: string): Observable<any> {
    console.log(this.username);
    return this.httpClient.delete('/api/accounts/' + username + "?accountId="+account.id );
  }


}
