import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {User} from "../../user";
import {LoginComponent} from "../../login/login/login.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[LoginComponent]
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    phoneNr: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = null;

  constructor(private authService: AuthService, private login: LoginComponent) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, phoneNr, password } = this.form;
    console.log(username + "   " + email + "  " + password);
    let user: User = new User(username, "ROLE_USER", phoneNr, email, password);
    this.register(user);
  }

  register(user: User): void{
    this.authService.register(user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.login.login(user.username, user.password);
      },
      err => {
        this.errorMessage = err.error;
        console.log(this.errorMessage);

        this.isSignUpFailed = true;
      }
    );
  }
}
