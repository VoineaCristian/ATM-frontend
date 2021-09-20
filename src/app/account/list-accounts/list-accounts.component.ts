import {Component, ComponentRef, OnInit, Type} from '@angular/core';
import {Account} from '../account';
import {AccountService} from '../account.service';
import {AccountContainer} from '../account-container';
import {Transaction} from '../../transaction/transaction';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAccountComponent} from "../add-account/add-account.component";
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WithdrawComponent} from "../../atm/withdraw/withdraw.component";
import {DepositComponent} from "../../atm/deposit/deposit.component";
import {GenerateReceiptComponent} from "../../atm/generate-receipt/generate-receipt.component";
import {TokenStorageService} from "../../auth/token/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css'],
  providers: [AccountService, {provide: MAT_DIALOG_DATA, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [AddAccountComponent]

})

export class ListAccountsComponent implements OnInit {
  accounts: Account[];
  count: number;
  selectedItem: Account;
  transactions: Transaction[];
  dialogRef: MatDialogRef<any>;
  indexOfSelectedItem = 0;


  constructor(
    private accountService: AccountService,
    private _modalService: NgbModal,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private router: Router,

  ) {
  }


  ngOnInit() {
    if(this.tokenStorage.getUser().role == "ROLE_ADMIN"){
      this.router.navigate(["/admin"]);
    }
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe((response: AccountContainer) => {
      this.accounts = response.accounts;
      this.count = this.accounts.length;
      if (this.indexOfSelectedItem == this.count) {
        this.indexOfSelectedItem = this.count - 1;
      }
      this.selectedItem = this.accounts[this.indexOfSelectedItem];
      this.transactions = this.selectedItem.transactions;
      console.log(this.indexOfSelectedItem);
    });
  }

  selectedAccount(account: Account, index: number) {

    this.indexOfSelectedItem = index;
    this.selectedItem = this.accounts[index];
    this.transactions = this.selectedItem.transactions;
  }

  getSign(account: Account) {
    if (account.currency === 'CURRENCY_RON') {
      return 'Ron';
    }
    if (account.currency === 'CURRENCY_EURO') {
      return 'Euro';
    }
  }

  isSelected(account: Account): boolean {
    return account.id == this.selectedItem.id;
  }

  reloadAfterClose(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe(() => {
      this.getAccounts();
    });
  }

  openAddAccountDialog(): void {
    this.openDialog(AddAccountComponent);
    this.dialogRef.afterClosed().subscribe(() => {
      this.indexOfSelectedItem = 0;
      this.selectedItem = this.accounts[0];
      this.transactions = this.selectedItem.transactions;
    })
  }

  openWithdrawDialog(): void {
    this.openDialog(WithdrawComponent);
    this.dialogRef.afterClosed().subscribe(() => {
      this.getAccounts();
    })
  }

  openDepositDialog(): void {
    this.openDialog(DepositComponent);
    this.reloadAfterClose(this.dialogRef);

  }

  openDialog(component: any) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(component, {
      data: {
        username: this.accountService.username,
        account: this.selectedItem
      }
    });
    this.reloadAfterClose(this.dialogRef);
  }


  openReceiptDialog(selTransaction: Transaction): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(GenerateReceiptComponent, {
      data: {
        transaction: selTransaction,
        currency: this.getSign(this.selectedItem),
      }
    });
    this.reloadAfterClose(this.dialogRef);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  deleteAccount() {
    if (confirm("Are you sure you want to delete this card?")) {
      this.accountService.deleteAccount(this.selectedItem, this.accountService.username).subscribe(() => {
          this.getAccounts();
        }
      );
    }
  }
}
