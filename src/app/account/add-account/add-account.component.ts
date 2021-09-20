import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormsModule, NgForm, FormGroup, Validators} from '@angular/forms';
import {AccountService} from "../account.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogRef
} from "@angular/material/dialog";
import {stringify} from "@angular/compiler/src/util";
import {Account} from "../account";
const nextY=[0,1,2,3,4,5];
@Component({
  selector: 'app-add-account',
  styleUrls: ['./add-account.component.scss'],
  templateUrl: './add-account.component.html',
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]


})

export class AddAccountComponent implements OnInit {

  username: string;
  number: string;
  regForm:FormGroup;
  cardNum1: string ="";
  cardNum2: string="";
  cardNum3: string="";
  cardNum4: string="";
  cardNumber: string;
  month: string;
  year: string;
  cardHolder: string;
  cvv: string;
  printCardNumber: string;
  currency: string;
  isValid = false;
  currencyList =[
    "CURRENCY_RON",
    "CURRENCY_EURO",
  ];
  months = Array.from(Array(13).keys());
  years: number[] = new Array();
  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: {username: string},
              public dialogRef: MatDialogRef<AddAccountComponent>,
              private formBuilder:FormBuilder){

    this.regForm=formBuilder.group({
      cardNum1: this.cardNum1,
      cardNum2: this.cardNum2,
      cardNum3: this.cardNum3,
      cardNum4: this.cardNum4,
      month: this.month,
      year: this.year,
      cardHolder: this.cardHolder,
      cvv: this.cvv,
      currency: this.currency,
    });


  }


  ngOnInit() {
    let anio: number = new Date().getFullYear();
    nextY.forEach((val: number)=>this.years.push(anio+val));


  }

  closeDialog(){
    this.dialogRef.close();
  }
  onSubmit() {
    this.month = this.regForm.get("month").value;
    this.year = this.regForm.get("year").value;
    this.currency = this.regForm.get("currency").value;
    console.log(this.month + this.year);
    console.log(this.regForm.value);
    let name = this.data.username;
    this.dialogRef.close();
    let accountBody = new Account(0, this.currency,[], this.cvv, this.printCardNumber, this.month+"/"+this.year);
    console.log(accountBody);
    this.accountService.addAccounts(accountBody, name).subscribe();
  }

  onInputCardNumber() {
    this.cardNum1 = this.regForm.get("cardNum1").value;
    this.cardNum2 = this.regForm.get("cardNum2").value;
    this.cardNum3 = this.regForm.get("cardNum3").value;
    this.cardNum4 = this.regForm.get("cardNum4").value;
    this.printCardNumber = this.cardNum1+"  "+this.cardNum2+"  "+this.cardNum3+"  "+this.cardNum4;
    this.cardNumber = this.cardNum1+this.cardNum2+this.cardNum3+this.cardNum4;
    this.isValid = this.regForm.valid;
  }

  onInputCardHolder() {
    this.cardHolder = this.regForm.get("cardHolder").value;
    this.isValid = this.regForm.valid;

  }
  onInputCVV(){
    this.cvv = this.regForm.get("cvv").value;
    this.isValid = this.regForm.valid;
    console.log("asdas");

  }

  onInputCurrency(){
    this.currency = this.regForm.get("currency").value;
    this.isValid = this.regForm.valid;
    console.log("asdasdas");

  }

  onInputYear(){
    this.month = this.regForm.get("month").value;
    this.year = this.regForm.get("year").value;
  }






}
