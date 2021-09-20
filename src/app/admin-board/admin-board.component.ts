import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account/account.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AccountContainer} from "../account/account-container";
import {Account} from "../account/account";
import {Money} from "../money/money";
import {MoneyContainer} from "../../app/money/money-container";
import {AdminService} from "./admin.service";
import {Stacks} from '../stacks/stacks'
import {RefillComponent} from "../atm/refill/refill.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {Country} from '@angular-material-extensions/select-country/';
import {TokenStorageService} from "../auth/token/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
  providers:[AdminService],
})
export class AdminBoardComponent implements OnInit {
  menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];
  moneys: Money[];
  selectedMoney: Money = null;
  selectedMoneyIndex: number;
  balance: number;
  stacks: Stacks[];
  dialogRef: MatDialogRef<any>;
  columnsToDisplay = [ 'type','value','count'];
  index :number = 0;

  constructor(
    private adminService: AdminService,
    private _modalService: NgbModal,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.tokenStorage.getUser().role != "ROLE_ADMIN"){
      this.router.navigate(["/accounts"]);
    }
    this.getMoneys();
  }

  getSign(currency: string) {
    if (currency === 'CURRENCY_RON') {
      return 'Ron';
    }
    if (currency === 'CURRENCY_EURO') {
      return 'Euro';
    }
  }
  calculateBalance(){
    this.balance = this.stacks.reduce((a,b)=>(a + b.count*b.notes.value), 0);
  }

  select(money: Money, index: number){
    this.selectedMoney = money;
    this.stacks = this.selectedMoney.stacks;
    this.calculateBalance();
    this.index = index;
    console.log(this.selectedMoney.stacks);
  }

  openRefillDialog(){
   this.openDialog(RefillComponent);
  }

  openDialog(component: any) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(component, {
      data: {
        username: this.adminService.username,
        money: this.selectedMoney,
      }
    });
    this.reloadAfterClose(this.dialogRef);
  }
  reloadAfterClose(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe(() => {
      this.getMoneys();
    });
  }
  getMoneys() {
    this.adminService.getBalance().subscribe((response: MoneyContainer) => {
      this.moneys = response.moneys
      this.selectedMoney = response.moneys[this.index];
      this.stacks = this.selectedMoney.stacks;
      this.calculateBalance();

    });
  }

  getFlagMapIndex(money: Money){
    switch(money.currency) {
      case "CURRENCY_EURO": {
        return 0;
      }
      case "CURRENCY_RON": {
        return 1;
      }


    }

  }

  isSelected(money: Money){

    return this.selectedMoney.currency === money.currency;
  }
}
