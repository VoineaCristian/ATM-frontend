import {AuthService} from "../../auth.service";

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {TokenStorageService} from "../../token/token-storage.service";
import {LocalStorageService} from "../../../local-storage.service";
import {User} from "../../user";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((response: HttpResponse<any>) => {
        let role = this.tokenStorage.getUser().role;
        let navigateTo = "/";
        if (role == "ROLE_ADMIN") {
          navigateTo = "admin";
        } else if (role == "ROLE_USER") {
          navigateTo = "accounts";
        }
        this.router.navigate([navigateTo]);

      },
      err => this.isLoggedIn = false);
  }

  getUser(path) {
    this.authService.isLoggedIn().subscribe((response: HttpResponse<any>) => {
        this.isLoggedIn = true;
        let user: User = JSON.parse(response.body);
        this.tokenStorage.saveUser(user);
        this.router.navigate([path]);
      },
      err => this.isLoggedIn = false);
  }

  onSubmit(): void {
    const {username, password} = this.form;
    let navigateTo = "/";
    this.login(username, password);


  }

  login(username, password){
    let navigateTo = "/";

    this.authService.login(username, password).subscribe(
      (data: HttpResponse<any>) => {
        this.isLoginFailed = false;
        this.tokenStorage.saveToken(data.headers.get("Authorization"));
        let role = JSON.parse(data.body)["role"];
        this.localStorage.setItem("role", role);
        if (role == "ROLE_ADMIN") {
          navigateTo = "admin";
        } else if (role == "ROLE_USER") {
          navigateTo = "accounts";
        }
        this.getUser(navigateTo);


      },
      err => {
        this.errorMessage = "Login failed!";
        this.isLoginFailed = true;
      }
    );
  }
}
