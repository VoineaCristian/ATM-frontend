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



@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
  providers:[AdminService],
})
export class AdminBoardComponent implements OnInit {

  moneys: Money[];
  selectedMoney: Money;
  selectedMoneyIndex: number;
  balance: number;
  stacks: Stacks[];
  dialogRef: MatDialogRef<any>;

  constructor(
    private adminService: AdminService,
    private _modalService: NgbModal,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAccounts();

  }

  calculateBalance(){
    this.balance = this.stacks.reduce((a,b)=>(a + b.count*b.notes.value), 0);
  }

  select(money: Money){
    this.selectedMoney = money;
    this.stacks = this.selectedMoney.stacks;
    this.calculateBalance();

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
      this.getAccounts();
    });
  }
  getAccounts() {
    this.adminService.getBalance().subscribe((response: MoneyContainer) => {
      this.moneys = response.moneys
    });
  }
}
