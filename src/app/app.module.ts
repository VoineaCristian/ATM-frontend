import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AtmComponent } from './atm/atm.component';
import { ListAccountsComponent } from './account/list-accounts/list-accounts.component';
import {CommonModule} from "@angular/common"
import { ListTransactionsComponent } from './transaction/list-transactions/list-transactions.component';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AddAccountComponent} from "./account/add-account/add-account.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccountService} from "./account/account.service";
import {MatButtonModule} from '@angular/material/button';
import { WithdrawComponent } from './atm/withdraw/withdraw.component';
import { DepositComponent } from './atm/deposit/deposit.component';
import { GenerateReceiptComponent } from './atm/generate-receipt/generate-receipt.component';
import { RefillComponent } from './atm/refill/refill.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { AuthComponent } from './auth/auth/auth.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { LoginComponent } from './auth/login/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AtmComponent,
    ListAccountsComponent,
    ListTransactionsComponent,
    AddAccountComponent,
    WithdrawComponent,
    DepositComponent,
    GenerateReceiptComponent,
    RefillComponent,
    AdminBoardComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    AccountService

  ],
  entryComponents: [
    ListAccountsComponent
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
