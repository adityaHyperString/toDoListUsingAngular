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
  folders: any = [];
  everyThing: any;
  myObj: any;
  addFileForm: any;


  showNewFile: any = [];
  constructor(private fb: FormBuilder, public commanServices: CommonServicesService) {

  }



  ngOnInit(): void {
    this.newFolderForm = this.fb.group({
      'id': new FormControl(Math.floor(Math.random() * 900000).toString()),
      "folderName": new FormControl(),
      "lists": new FormControl(),

    });
    this.newFileForm = this.fb.group({
      'id': new FormControl(),
      'listName': new FormControl(),
      'todos': new FormControl(),
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
      id: this.newFolderForm.value.id,
      folderName: this.newFolderForm.value.folderName,

    }
    this.folders.push(this.myObj)
    localStorage.setItem("EveryThing", JSON.stringify(this.folders));

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
    if (this.folders[i].lists == undefined) {
      this.folders[i].lists = []
    }
    this.folders[i].lists.push({
      id: Math.floor(Math.random() * 900000).toString(),
      listName: this.newFileForm.value.listName,
    })
    localStorage.setItem('EveryThing', JSON.stringify(this.folders))
  }

  getId(id, listName) {
    this.commanServices.getId(id).subscribe((res) => {
      localStorage.setItem('fileId', res)
      localStorage.setItem('listName', listName)

    })

  }

}
