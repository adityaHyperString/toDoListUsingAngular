import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.css']
})
export class AddTodoListComponent implements OnInit {
  addBtn: any;
  notesObj: any = [];
  myObj: any;
  getData:any;
  toDoForm: FormGroup;
  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {

    this.toDoForm = this.fb.group({
      "title": new FormControl(),
      "note": new FormControl(),

    });

  }
// save function used to save to do list in local storage
  save() {
    this.getData = localStorage.getItem('notes')
    this.notesObj = JSON.parse(this.getData)
    this.myObj = {
      title: this.toDoForm.value.title,
      note: this.toDoForm.value.note
    }
    this.notesObj.push(this.myObj)
    localStorage.setItem("notes", JSON.stringify(this.notesObj));
    this.ngOnInit();
    // debugger
  }
}
