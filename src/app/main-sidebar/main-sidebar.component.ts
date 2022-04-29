import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbMenuItem, NbMenuService  } from '@nebular/theme';
import { AddTodoListComponent } from "../add-todo-list/add-todo-list.component";
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidebarComponent implements OnInit {
  title: any;
  input: any;
  addFolderForm: any;
  newFolderForm: FormGroup;
  newFileForm: FormGroup;
  folders:any=[];
  everyThing:any;
  myObj: any;
  addFileForm: any;
  newFile:any=[];
  newToDos:any=[];
  constructor(private fb: FormBuilder) {

   }



  ngOnInit(): void {

    this.newFolderForm = this.fb.group({
      'id': new FormControl(Math.floor(Math.random() * 900000).toString()),
      "folderName": new FormControl(),
      "lists": new FormControl(this.newFile)

    });

    this.newFileForm = this.fb.group({
      'id': new FormControl(Math.floor(Math.random() * 900000).toString()),
      'listName': new FormControl(),
      'todos':new FormControl(this.newToDos),
    })
    this.showFolders();
    this.showFile();

  }


  addSpace(){
    console.log('inside addlist');
    this.addFolderForm = document.getElementById('addFolderForm');
    this.addFolderForm.style.display = 'flex'
  }

  createNewFolder(){
    this.everyThing = localStorage.getItem('EveryThing')
    if ( this.everyThing == null) {
      this.folders = [];
  } else {
    this.folders = JSON.parse(this.everyThing);
  }


    this.myObj = {
      id: this.newFolderForm.value.id,
      folderName: this.newFolderForm.value.folderName,
      lists: this.newFolderForm.value.lists
    }
    this.folders.push(this.myObj)
    localStorage.setItem("EveryThing", JSON.stringify(this.folders));

  }

  showFolders(){

    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)

  }

  showFile(){
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
    for (let i = 0; i < this.folders.length; i++) {
     console.log(this.folders[i]);


    }
  }

  addNewFile(i){
    console.log('inside add new file',i);
    this.addFileForm = document.getElementById('addFileForm');
    this.addFileForm.style.display="flex"

  }

  createNewFile(i){
    console.log('file created',i);
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing);
    console.log('folder',this.folders);

    for (let index = 0; index < this.folders.length; index++) {

      if (this.folders[index].id == i) {

          this.myObj ={
            id: this.newFileForm.value.id,
            listName: this.newFileForm.value.listName,
            todos: this.newFileForm.value.todos
          }

          this.newFile.push(this.myObj)
          this.folders[index].lists.push(this.newFile)


          localStorage.setItem("EveryThing", JSON.stringify(this.folders));
        }
    }

  }

}
