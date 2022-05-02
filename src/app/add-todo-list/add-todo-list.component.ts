import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
import { ShowTodoListComponent } from "../show-todo-list/show-todo-list.component";
import { MatDialog } from '@angular/material/dialog';
import { CommonServicesService } from "../common-services.service";
import { ConfirmBoxComponent } from "../confirm-box/confirm-box.component";
import { MatSnackBar } from '@angular/material/snack-bar';


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
  // dialog: any
  inputVariable: any = [];
  folders: any = [];
  everyThing: any;
  id: any;
  toDos: any = [];
  todosLength: any;
  listName: string;
  @ViewChild('confirmBox', { static: false }) confirmBox: ConfirmBoxComponent;
  deletedData: any = [];
  constructor(private fb: FormBuilder, public commonServices: CommonServicesService, private dialog: MatDialog) { }



  ngOnInit(): void {

    this.toDoForm = this.fb.group({
      'id': new FormControl(),
      "name": new FormControl(),
      "discription": new FormControl(),

    });

    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)

    this.showToDos();



  }


  save1(i) {
    this.id = localStorage.getItem('fileId')
    // console.log(this.id);


    for (i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {

        if (this.folders[i].lists[j].id == this.id) {

          if (this.folders[i].lists[j].todos == undefined) {
            this.folders[i].lists[j].todos = []
          }
          this.folders[i].lists[j].todos.push({
            id: Math.floor(Math.random() * 900000).toString(),
            name: this.toDoForm.value.name,
          })
        }
      }

    }
    localStorage.setItem('EveryThing', JSON.stringify(this.folders))
    this.showToDos();


  }

  showToDos() {
    this.listName = localStorage.getItem('listName')
    this.id = localStorage.getItem('fileId')
    // console.log(this.folders);
    for (let i = 0; i < this.folders.length; i++) {
      // console.log(this.folders[i].lists);
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == this.id) {

          // console.log(this.folders[i].lists[j].todos);
          this.toDos = this.folders[i].lists[j].todos
          this.todosLength = this.toDos.length

        }

      }


    }



  }

  clear() {
    this.toDoForm.reset();
  }
  openConfirmDialog() {
    return this.dialog.open(ConfirmBoxComponent)
  }

  deleteToDo(id, index) {
    console.log('deleted id', id);
    this.id = localStorage.getItem('fileId')
    // console.log(this.id);
    console.log(index);


    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {

        if (this.folders[i].lists[j].id == this.id) {
            this.openConfirmDialog().afterClosed().subscribe(res => {
              if (res) {
                this.deletedData = this.folders[i].lists[j].todos.splice(index, 1);
                console.log(this.deletedData);
                localStorage.setItem('deletedData', JSON.stringify(this.deletedData));
                localStorage.setItem('EveryThing',JSON.stringify(this.folders))
              }
            })
        }
      }
    }
    this.showToDos();
  }

}
