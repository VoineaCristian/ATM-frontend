import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ListAccountsComponent } from './account/list-accounts/list-accounts.component';
import {ListTransactionsComponent} from './transaction/list-transactions/list-transactions.component';

const routes: Routes = [
  {path: 'accounts/:username', component: ListAccountsComponent,},
  {path: 'transactions', component: ListTransactionsComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
