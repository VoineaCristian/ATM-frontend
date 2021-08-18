import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' , 'Access-Control-Allow-Origin': '*'})
    };
    const body = new URLSearchParams();
    body.set('password', password);
    body.set('username', username);
    return this.http.post(AUTH_API +'login',body , httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    });
  }
  isLoggedIn(): Observable<any> {
    let a = this.http.get('/api/' + 'restricted');
    console.log(a);
    return a;
  }
}
