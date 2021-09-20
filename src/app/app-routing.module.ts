import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ListAccountsComponent } from './account/list-accounts/list-accounts.component';
import {ListTransactionsComponent} from './transaction/list-transactions/list-transactions.component';
import {AddAccountComponent} from "./account/add-account/add-account.component";
import {AdminBoardComponent} from "./admin-board/admin-board.component";
import {LoginComponent} from "./auth/login/login/login.component";
import {AuthComponent} from "./auth/auth/auth.component";

const routes: Routes = [
  {path: 'accounts', component: ListAccountsComponent,},
  {path: 'admin', component: AdminBoardComponent,},
  {path: 'transactions', component: ListTransactionsComponent},
  {path: 'login', component: AuthComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
