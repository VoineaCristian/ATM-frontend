import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAccountComponent } from './add-account/add-account.component';
import {ListAccountsComponent} from "./list-accounts/list-accounts.component";

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [
    AddAccountComponent,
    ListAccountsComponent
  ]
})
export class AccountModule { }
