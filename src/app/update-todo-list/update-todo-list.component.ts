import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";

@Component({
  selector: 'app-update-todo-list',
  templateUrl: './update-todo-list.component.html',
  styleUrls: ['./update-todo-list.component.scss']
})
export class UpdateTodoListComponent implements OnInit {
  updateForm: FormGroup;
  myObj: any;
  getData: any;
  notesObj: any = [];


  constructor(private dialog: MatDialog, private _dialogRref: MatDialogRef<UpdateTodoListComponent>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      "id": new FormControl(this.data?.note?.id),
      "title": new FormControl(this.data?.note?.title),
      "note": new FormControl(this.data?.note?.note),
    });


  }

  onUpdate(index) {
    this.getData = localStorage.getItem('notes')
    this.notesObj = JSON.parse(this.getData)
    this.notesObj[this.data.index] = { ...this.updateForm.value };
    localStorage.setItem('notes', JSON.stringify(this.notesObj));
    this._dialogRref.close({ ...this.updateForm.value });

  }

  onClose() {
    this.dialog.closeAll();
  }
}
