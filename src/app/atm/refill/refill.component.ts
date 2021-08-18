import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Notes} from "../../notes/notes";
import {AtmServiceService} from "../atm-service.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "../../account/account";
import {AddAccountComponent} from "../../account/add-account/add-account.component";
import {Stacks} from "../../stacks/stacks";
import {Money} from "../../money/money";

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements OnInit {

  notesForm: FormGroup;
  banknotes: Notes[] = [];
  private username: string = this.data.username;

  constructor(private atmService: AtmServiceService, private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: {
                username: string,
               money: Money
              },
              public dialogRef: MatDialogRef<AddAccountComponent>,
              private fb: FormBuilder) {
    this.notesForm = this.fb.group({
      notes: this.fb.array([]),
    });
  }

  getNotes() {
    this.atmService.getNotes(this.data.money.currency).subscribe((response: Notes[]) => {
      this.banknotes = response;
      this.banknotes.forEach(n => this.addNote(n));
    });
  }

  ngOnInit() {
    this.getNotes();

  }

  // addNumber() {
  //   const control = <FormArray>this.notesForm.controls['type'];
  //   control.push(new FormControl())
  // }
  closeDialog() {
    this.dialogRef.close();
  }

  newNote(n: Notes): FormGroup {
    return this.fb.group({
      notes: n,
      count: 0,
    })
  }

  get notes(): FormArray {
    return this.notesForm.get("notes") as FormArray
  }

  notess() {
    let a = this.notesForm.get("notes") as FormArray;
    return a.controls;
  }

  addNote(n) {
    this.notes.push(this.newNote(n));
  }

  onSubmit() {
    let stacks: Stacks[] = this.notesForm.get("notes").value;
    let money: Money = new Money(this.data.money.currency, stacks);
    this.atmService.refill(money, this.username).subscribe();
    this.closeDialog();
  }


}
