import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { CommonServicesService } from "../common-services.service";

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
  renameForm: FormGroup;
  folders: any = [];
  everyThing: any;
  myObj: any;
  addFileForm: any;
  listNameFlag = 1
  newFileName: any;
  showNewFile: any = [];
  deletedFile: any = [];
  dataLength: any
  deletedFolder: any;
  newFolderName: any;


  constructor(private fb: FormBuilder, public commanServices: CommonServicesService) {

  }



  ngOnInit(): void {
    this.newFolderForm = this.fb.group({
      'id': new FormControl(),
      "folderName": new FormControl(),
      "lists": new FormControl(),

    });
    this.newFileForm = this.fb.group({
      'id': new FormControl(),
      'listName': new FormControl(),
      'todos': new FormControl(),
    })
    this.renameForm = this.fb.group({
      'renameList': new FormControl()
    })
    this.showFolders();
    this.showFile();

  }


  addSpace() {
    console.log('inside addlist');
    this.addFolderForm = document.getElementById('addFolderForm');
    this.addFolderForm.style.display = 'flex'
  }

  createNewFolder() {
    this.everyThing = localStorage.getItem('EveryThing')
    if (this.everyThing == null) {
      this.folders = [];
    } else {
      this.folders = JSON.parse(this.everyThing);
    }
    this.myObj = {
      id: Math.floor(Math.random() * 900000).toString(),
      folderName: this.newFolderForm.value.folderName,
      lists: []
    }
    this.folders.push(this.myObj)
    localStorage.setItem("EveryThing", JSON.stringify(this.folders));
    this.newFolderForm.reset();
  }

  showFolders() {
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
  }

  showFile() {

    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        this.showNewFile = this.folders[i].lists
        console.log(this.showNewFile);

      }
    }


  }

  addNewFile(i) {
    this.addFileForm = document.getElementById('addFileForm');
    this.addFileForm.style.display = "flex"
  }

  createNewFile(i) {
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing);

    this.folders[i].lists.push({
      id: Math.floor(Math.random() * 900000).toString(),
      listName: this.newFileForm.value.listName,
      todos: []
    })
    localStorage.setItem('EveryThing', JSON.stringify(this.folders))
    this.showFile();
    this.newFileForm.reset();
  }

  getId(id, listName) {
    this.commanServices.getId(id).subscribe((res) => {
      localStorage.setItem('fileId', id)
      localStorage.setItem('listName', listName)


    })
    this.commanServices.sendClickEvent();
  }

  renameFile(index, id, event: any) {
    let target = event.target.parentNode.parentNode.parentNode.previousSibling.firstChild
    target.contentEditable = "true";


    let interVel = setInterval(() => {
      target.contentEditable = "false"
      this.newFileName = target.innerText
      for (let i = 0; i < this.folders.length; i++) {
        for (let j = 0; j < this.folders[i].lists.length; j++) {
          if (this.folders[i].lists[j].id == id) {
            this.folders[i].lists[j].listName = this.newFileName

            localStorage.setItem('EveryThing', JSON.stringify(this.folders))
          }

        }

      }

    }, 8000)
    setTimeout(() => {

      clearInterval(interVel);
      this.ngOnInit();
    }, 10000);

  }




  deleteFile(index, id) {
    console.log('in deltt', id);
    console.log('index', index);

    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].lists.length; j++) {
        if (this.folders[i].lists[j].id == id) {
          this.deletedFile = this.folders[i].lists.splice(index, 1);
          console.log(this.deletedFile);
        }
      }
    }
    console.log(this.folders);

    localStorage.setItem('EveryThing', JSON.stringify(this.folders))

    this.showFile();

  }

  deleteFolder(id, index) {
    console.log('delete folder', id);
    this.everyThing = localStorage.getItem('EveryThing')
    this.folders = JSON.parse(this.everyThing)
    for (let i = 0; i < this.folders.length; i++) {

      if (this.folders[i].id == id) {
        this.deletedFolder = this.folders.splice(index, 1);
        console.log(this.deletedFolder);
      }

    }
    localStorage.clear();
    // localStorage.setItem('EveryThing', JSON.stringify(this.folders))
  }
  renameFolder(id, event: any) {
    let target = event.target.parentNode.parentNode.parentNode.parentNode.firstChild.children[3]
    console.log('rename folder', target);
    target.contentEditable = "true";

    let interval = setInterval(() => {
      target.contentEditable = 'false'
      this.newFolderName = target.innerText
      for (let i = 0; i < this.folders.length; i++) {
        if (this.folders[i].id == id) {
          this.folders[i].folderName = this.newFolderName
          localStorage.setItem('EveryThing', JSON.stringify(this.folders))
        }
      }
    }, 7000)
    setTimeout(() => {

      clearInterval(interval);
      this.ngOnInit();
    }, 10000);
  }



}
