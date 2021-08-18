import {Component, Inject, OnInit} from '@angular/core';
import {AccountService} from "../../account/account.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {AddAccountComponent} from "../../account/add-account/add-account.component";
import {Stacks} from "../../stacks/stacks";
import {Money} from "../../money/money";
import {AtmServiceService} from "../atm-service.service";
import {Account} from "../../account/account";
import {Notes} from "../../notes/notes";
import { map } from 'rxjs/operators'
import {AccountContainer} from "../../account/account-container";
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})

export class WithdrawComponent implements OnInit {

  // stacks: Stacks[] = [];
  // notesForm = new FormGroup({
  //   type: this.fb.array([
  //     new FormControl()
  //   ]),
  //   value: new FormControl('20')
  // });

  // arr: string[] = [
  //   "EURO_5",
  //   "EURO_10",
  //   "EURO_20",
  //   "EURO_50",
  //   "EURO_100",
  //   "EURO_200",
  //   "EURO_500"
  // ];
  private username: string;
  constructor(private atmService: AtmServiceService, private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: {username: string,
                                                    account: Account},
              public dialogRef: MatDialogRef<AddAccountComponent>,
              private fb: FormBuilder){
  }

  ngOnInit() {
  }



  closeDialog(){
    this.dialogRef.close();
  }
  onSubmit(formBody: NgForm) {
    let amount: number = formBody.value.amount;
    this.atmService.withdraw(this.data.username, this.data.account.id, amount).subscribe();
    this.closeDialog();
  }


}
