import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
import { ShowTodoListComponent } from "../show-todo-list/show-todo-list.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.scss']
})
export class AddTodoListComponent implements OnInit {
  @ViewChild('childComponent', { static: false }) childComponent: ShowTodoListComponent;
  addBtn: any;
  notesObj: any = [];
  myObj: any;
  getData: any;
  toDoForm: FormGroup;
  dialog: any
  inputVariable: any = [];
  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {

    this.toDoForm = this.fb.group({
      'id': new FormControl(Math.floor(Math.random() * 900000).toString()),
      "title": new FormControl(),
      "note": new FormControl(),

    });

  }
  // save function used to save to do list in local storage
  save() {
    this.getData = localStorage.getItem('notes')
    this.notesObj = JSON.parse(this.getData)
    this.myObj = {
      id: this.toDoForm.value.id,
      title: this.toDoForm.value.title,
      note: this.toDoForm.value.note
    }
    console.log(this.notesObj);

    this.notesObj.push(this.myObj)
    localStorage.setItem("notes", JSON.stringify(this.notesObj));
    this.inputVariable = this.notesObj;
    console.log('inputvariable', this.inputVariable);

    this.ngOnInit();
    this.childComponent.showNotes()
    // debugger
  }





}
