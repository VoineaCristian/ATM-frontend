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
import {map} from 'rxjs/operators'
import {AccountContainer} from "../../account/account-container";
import {HttpResponse} from "@angular/common/http";
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})

export class WithdrawComponent implements OnInit {

  isClicked = false;
  availableAmount = 100;
  form: any = {
    amount: null,
  };
  isError = false;
  isSuccess = false;

  errorMessage = "";


  constructor(private atmService: AtmServiceService, private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: {
                username: string,
                account: Account
              },
              public dialogRef: MatDialogRef<AddAccountComponent>,
              private fb: FormBuilder,
              overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.availableAmount = this.data.account.sold;
    console.log(this.data.account.sold);
  }


  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {

    this.isClicked = true;
    const amount = this.form.amount;
    this.atmService.withdraw(this.data.username, this.data.account.id, amount).subscribe((response: HttpResponse<any>) => {
        setTimeout(() => {
          this.isSuccess = true;
        }, 2000)
      },
      err => {
        setTimeout(() => {
          this.isError = true;
          this.errorMessage = err.error;
        }, 2000)

      });
  }


}
