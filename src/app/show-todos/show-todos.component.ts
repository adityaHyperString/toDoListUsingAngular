import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.scss']
})
export class ShowTodosComponent implements OnInit {
  discriptionForm: FormGroup;
  fileId:any;
  folders:any=[];
  fileName: any;
  todoName: any;
  discriptn: string;
  flagId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private dialog: MatDialog,private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.showAllData();
    console.log(this.data.flagId);
    this.flagId = this.data.flagId;
    this.discriptionForm =this.fb.group({
      "name": new FormControl(this.todoName),
      "discription": new FormControl(this.discriptn),

    });


  }

  showAllData(){
    this.fileId = localStorage.getItem('fileId')
    this.folders = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.folders)
    for (let i = 0; i < this.folders.length; i++) {
     for (let j = 0; j < this.folders[i].lists.length; j++) {
      if (this.folders[i].lists[j].id == this.fileId) {
        this.fileName = this.folders[i].lists[j].listName
        for (let k = 0; k < this.folders[i].lists[j].todos.length; k++) {
          if (this.folders[i].lists[j].todos[k].id == this.data.itemId) {
            this.todoName = this.folders[i].lists[j].todos[k].name
            this.discriptn = this.folders[i].lists[j].todos[k].discription
            console.log(this.discriptn);

          }
        }
      }
     }
    }
  }

  onClose() {
    this.dialog.closeAll();
  }

  save(){
    this.fileId = localStorage.getItem('fileId')
    this.folders = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.folders)
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == this.fileId) {
          for (let k = 0; k < this.folders[i].lists[j].todos.length; k++) {
            if (this.folders[i].lists[j].todos[k].id == this.data.itemId) {
              if (this.folders[i].lists[j].todos[k].discription == undefined || this.folders[i].lists[j].todos[k].discription == null) {
                this.folders[i].lists[j].todos[k].discription = String;
              }
              this.folders[i].lists[j].todos[k].discription=
                 this.discriptionForm.value.discription
            }

          }

        }

      }
    }
    console.log(this.folders);
    localStorage.setItem('EveryThing', JSON.stringify(this.folders))
    this.onClose();
    this.showAllData();
  }

  editToDo(){
    this.fileId = localStorage.getItem('fileId')
    this.folders = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.folders)
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == this.fileId) {
          for (let k = 0; k < this.folders[i].lists[j].todos.length; k++) {
            if (this.folders[i].lists[j].todos[k].id == this.data.itemId) {
               console.log(this.folders[i].lists[j].todos[k]);
               this.folders[i].lists[j].todos[k].name = this.discriptionForm.value.name
               this.folders[i].lists[j].todos[k].discription = this.discriptionForm.value.discription
            }
          }
        }
      }
    }
    localStorage.setItem('EveryThing', JSON.stringify(this.folders))
    this.showAllData();
    this.onClose();

  }

}
