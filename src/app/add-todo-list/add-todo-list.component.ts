import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonServicesService } from "../common-services.service";
import { ConfirmBoxComponent } from "../confirm-box/confirm-box.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowTodosComponent } from "../show-todos/show-todos.component";



@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.scss']
})
export class AddTodoListComponent implements OnInit {
  data: any;
  addBtn: any;
  notesObj: any = [];
  myObj: any;
  getData: any;
  toDoForm: FormGroup;
  inputVariable: any = [];
  folders: any = [];
  everyThing: any;
  id: any;
  toDos: any = [];
  todosLength: any;
  listName: string;
  txt: string
  @ViewChild('confirmBox', { static: false }) confirmBox: ConfirmBoxComponent;
  deletedData: any = [];

  constructor(private fb: FormBuilder, public commonServices: CommonServicesService, private dialog: MatDialog, public _snackBar: MatSnackBar) {
    this.commonServices.getClickEvent().subscribe(()=>{
      this.showToDos();
    })
  }



  ngOnInit(): void {

    this.commonServices.currentSearchText.subscribe(txt => this.txt = txt)
    this.toDoForm = this.fb.group({
      'id': new FormControl(),
      "name": new FormControl(),
      "discription": new FormControl(),
    });
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
    this.showToDos();
  }

  //saving todos inside perticular file
  save1(i) {

    this.id = localStorage.getItem('fileId')
    for (i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == this.id) {
          this.folders[i].lists[j].todos.push({
            id: Math.floor(Math.random() * 900000).toString(),
            name: this.toDoForm.value.name,
          })
        }
      }
    }
    localStorage.setItem('EveryThing', JSON.stringify(this.folders))
    this.showToDos();
    this.clear();

  }

  //show todos on page
  showToDos() {
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
    this.listName = localStorage.getItem('listName')
    this.id = localStorage.getItem('fileId')
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == this.id) {
          this.toDos = this.folders[i].lists[j].todos
          this.todosLength = this.toDos.length

        }
      }
    }
  }

  clear() {
    this.toDoForm.reset();
  }
  //open confirm box when we delting item
  openConfirmDialog() {
    return this.dialog.open(ConfirmBoxComponent)
  }

  //deleteing perticualar item
  deleteToDo(id, index) {
    this.id = localStorage.getItem('fileId')
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == this.id) {
          this.openConfirmDialog().afterClosed().subscribe(res => {
            if (res) {
              this.deletedData = this.folders[i].lists[j].todos.splice(index, 1);
              console.log(this.deletedData);
              localStorage.setItem('deletedData', JSON.stringify(this.deletedData));
              localStorage.setItem('EveryThing', JSON.stringify(this.folders))
              this.openSnackBar();
            }
          })
        }
      }
    }
    this.showToDos();
  }

  //snackbar for undo the deleted data
  openSnackBar() {
    let snackbarRef = this._snackBar.open("Data Deleted!", 'UNDO', {
      duration: 3000,
    });
    snackbarRef.onAction().subscribe(() => {
      this.id = localStorage.getItem('fileId')
      this.deletedData = localStorage.getItem('deletedData');
      this.folders = localStorage.getItem('EveryThing')
      this.deletedData = JSON.parse(this.deletedData)
      this.folders = JSON.parse(this.folders)
      for (let i = 0; i < this.folders.length; i++) {
        for (let j = 0; j < this.folders[i].lists.length; j++) {
          if (this.folders[i].lists[j].id == this.id) {
            this.folders[i].lists[j].todos.push({
              id: this.deletedData[0].id,
              name: this.deletedData[0].name,
            });
            localStorage.setItem('EveryThing', JSON.stringify(this.folders))
          }
        }
      }
      console.log(this.folders);
      this.showToDos();

    })
    snackbarRef.afterDismissed().subscribe(() => {
      localStorage.removeItem('deletedData');
      this.showToDos();
    })

  }

  //open todo in popup for adding discription
  openTask(id, index) {
    let flag = 1
    const dialogConfig = new MatDialogConfig();
    const dialogRref = this.dialog.open(ShowTodosComponent, {
      data: {
        itemId: id,
        flagId: flag
      },
    })
  }

  //edit todo and discription
  editToDo(id, index) {
    let flag = 0
    const dialogConfig = new MatDialogConfig();
    const dialogRref = this.dialog.open(ShowTodosComponent, {
      data: {
        itemId: id,
        flagId: flag
      },
    })
    dialogRref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

}
