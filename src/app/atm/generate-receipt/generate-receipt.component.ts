import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AtmServiceService} from "../atm-service.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "../../account/account";
import {AddAccountComponent} from "../../account/add-account/add-account.component";
import {FormBuilder} from "@angular/forms";
import {jsPDF} from 'jspdf';
import * as _html2canvas from "html2canvas";
import {Stacks} from "../../stacks/stacks";
import {TokenStorageService} from "../../auth/token/token-storage.service";
import {Transaction} from "../../transaction/transaction";
import {transition} from "@angular/animations";


const typesJobs = [1,2,3];
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-generate-receipt',
  templateUrl: './generate-receipt.component.html',
  styleUrls: ['./generate-receipt.component.scss']
})

export class GenerateReceiptComponent implements OnInit {

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  username = this.tokenStorage.getUser().username;
  stacks: Stacks[];
  constructor(private atmService: AtmServiceService, private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: {
                transaction: Transaction,
                currency: string,
              },
              public dialogRef: MatDialogRef<AddAccountComponent>,
              private fb: FormBuilder,
              private tokenStorage: TokenStorageService)
  {}

  ngOnInit(): void {
    this.stacks = this.data.transaction.stacks;
    this.username = this.tokenStorage.getUser().username;
  }

  getAction(){
    if(this.data.transaction.transactionType == "TRANSACTION_DEPOSIT"){
      return 'deposited';
    }
    if(this.data.transaction.transactionType == "TRANSACTION_WITHDRAW"){
      return 'received';
    }
  }

  public getNrOfNotes(){
    return this.data.transaction.stacks.reduce((acc, val) => acc += val.count, 0);
  }

  public openPDF():void {
    var data = document.getElementById('htmlData');  //Id of the table
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

}
