import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../auth/token/token-storage.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  logoutDialog() {
    if(confirm("Are you sure you want to logout?")) {
      this.tokenStorage.signOut();
      this.router.navigate(["/login"]);
    }
  }
  isLoggedIn(){
    return this.tokenStorage.getToken() != null;
  }

}
