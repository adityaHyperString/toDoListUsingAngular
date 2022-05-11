import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, } from "@angular/forms";

//SERVICES
import { MatDialog, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { CommonFunctionServiceService } from "../../services/common-function-service.service";

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent implements OnInit {
  newTodoForm: FormGroup


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private commanSerives: CommonFunctionServiceService
  ) { }

  ngOnInit(): void {
    this.newTodoForm = this.fb.group({
      "name": new FormControl(this.data?.list?.name),
      "discription": new FormControl(this.data?.list?.discription),
    });
  }

  //USED TO SAVE AND PUSH TODOS IN PARTICULAR FILE
  save() {
    let fileId = localStorage.getItem('fileId')
    let allData = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        if (allData[i].files[j].id == fileId) {
          allData[i].files[j].todos.push({
            id: Math.floor(Math.random() * 900000).toString(),
            name: this.newTodoForm.value.name,
            discription: this.newTodoForm.value.discription,
          })
        }
      }
    }
    localStorage.setItem('allData', JSON.stringify(allData))
    this.dialog.closeAll();
    this.commanSerives.sendClickEvent();
  }

  //USED TO EDIT TODOS FROM PARTICULAR FILE
  edit() {
    let fileId = localStorage.getItem('fileId')
    let allData = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        if (allData[i].files[j].id == fileId) {
          for (let k = 0; k < allData[i].files[j].todos.length; k++) {
            if (allData[i].files[j].todos[k].id == this.data.list.id) {
              allData[i].files[j].todos[k].name = this.newTodoForm.value.name
              allData[i].files[j].todos[k].discription = this.newTodoForm.value.discription
            }

          }
        }
      }
    }
    localStorage.setItem('allData', JSON.stringify(allData))
    this.dialog.closeAll();
    this.commanSerives.sendClickEvent();
  }

  //USED TO CLOSE DIALOG
  close() {
    this.dialog.closeAll();
  }

}
