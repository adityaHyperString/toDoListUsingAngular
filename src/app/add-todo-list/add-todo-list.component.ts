import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
import { ShowTodoListComponent } from "../show-todo-list/show-todo-list.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.css']
})
export class AddTodoListComponent implements OnInit {
  addBtn: any;
  notesObj: any = [];
  myObj: any;
  getData: any;
  toDoForm: FormGroup;
  dialog: any

  constructor(private fb: FormBuilder, public showComponent: ShowTodoListComponent) { }



  ngOnInit(): void {

    this.toDoForm = this.fb.group({
      'id': new FormControl(Math.floor(Math.random() * 900000).toString()),
      "title": new FormControl(),
      "note": new FormControl(),

    });
    this.showComponent.ngOnInit();
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

    this.ngOnInit();
    // debugger
  }


}
