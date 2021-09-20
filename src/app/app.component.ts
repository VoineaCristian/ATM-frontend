import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  title = 'app works!';
  constructor(authService: AuthService, router: Router) {
    authService.isLoggedIn().subscribe((data: HttpResponse<any>) => {
      console.log(data.body);
      },
      err => {
        router.navigate(['/login']);

      }
    );

  }
}
