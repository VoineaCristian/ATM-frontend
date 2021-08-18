import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AtmServiceService} from "../atm-service.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "../../account/account";
import {AddAccountComponent} from "../../account/add-account/add-account.component";
import {FormBuilder} from "@angular/forms";
import {jsPDF} from 'jspdf';
import * as _html2canvas from "html2canvas";


const typesJobs = [1,2,3];
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-generate-receipt',
  templateUrl: './generate-receipt.component.html',
  styleUrls: ['./generate-receipt.component.scss']
})

export class GenerateReceiptComponent implements OnInit {
  typeOfJobs = typesJobs;
  username = this.data.username;
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },

  ];

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  name = 'Angular Html To Pdf ';
  constructor(private atmService: AtmServiceService, private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: {
                username: string,
                account: Account
              },
              public dialogRef: MatDialogRef<AddAccountComponent>,
              private fb: FormBuilder)
  {}

  ngOnInit(): void {
  }
  public openPDF():void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');
    });
  }

}
