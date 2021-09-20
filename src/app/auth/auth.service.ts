import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./token/token-storage.service";
import {User} from "./user";

const AUTH_API = '/api/';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type',  'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('password', password);
    body.set('username', username);
    return this.http.post(AUTH_API +'login',body , {headers: headers, responseType: 'text', observe: 'response'});
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'register', user, {responseType: 'text', observe: 'response'});
  }
  isLoggedIn(): Observable<any> {
    let rsp= this.http.get('/api/me', {responseType: 'text', observe: 'response'});
    return rsp;
  }
}
