import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import {  FormGroup,  FormControl,  Validators,  FormBuilder,} from "@angular/forms";

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.css']
})
export class AddTodoListComponent implements OnInit {
  addBtn:any;

  toDoForm: FormGroup ;
  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {

    this.toDoForm = this.fb.group({
      "title": new FormControl(''),
      "note": new FormControl(''),

    });

  }

  save(){
    //  this.addBtn = document.getElementById('addBtn');
    // this.addBtn.addEventListener("click", function () {
    //     let addTxt = document.getElementById('addTxt');
    //     let noteTitle = document.getElementById('noteTitle');

    //     let notes = localStorage.getItem('notes');
console.log('save button clicked');



        // if (notes == null) {
        //     notesObj = [];
        // } else {
        //     notesObj = JSON.parse(notes);
        // }
        // let myObj = {
        //     title: noteTitle.value,
        //     text: addTxt.value
        // }
        // notesObj.push(myObj);
        // localStorage.setItem("notes", JSON.stringify(notesObj));
        // addTxt.value = "";
        // noteTitle.value = "";


    // });
  }
}
