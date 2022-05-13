import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, } from "@angular/forms";


// SERVICES
import { NbDialogRef } from '@nebular/theme';
import { CommonFunctionServiceService } from "../../services/common-function-service.service";

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  newFileForm: FormGroup;
  folders: any[];
  flag: any;
  file: any;

  constructor(
    private fb: FormBuilder,
    private nbDialogRef: NbDialogRef<any>,
    private commanServices: CommonFunctionServiceService,
  ) { }

  ngOnInit(): void {
    this.newFileForm = this.fb.group({
      "fileName": new FormControl(this.file?.title),
    });

  }

  //TO SAVE OR PUSH FILE INSIDE PARTICULAR FOLDER AND STORE ALL DATA IN LOCALSTORAGE
  save() {
    let folderId = localStorage.getItem('folderId')
    let allData = localStorage.getItem('allData')
    if (allData == null) {
      this.folders = [];
    } else {
      this.folders = JSON.parse(allData);
    }
    for (let i = 0; i < this.folders.length; i++) {
      if (this.folders[i].id == folderId) {
        this.folders[i].files.push({
          id: Math.floor(Math.random() * 900000).toString(),
          title: this.newFileForm.value.fileName,
          todos: []
        })
      }
    }
    localStorage.setItem('allData', JSON.stringify(this.folders))
    this.commanServices.sendClickEvent();
    this.close()
  }

  //TO CLOSE DIALOG BOX
  close() {
    this.nbDialogRef.close();
  }

  //TO EDIT FILE NAME OF PARTICULAR FOLDER
  edit() {
    let allData = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        if (allData[i].files[j].id == this.file?.id) {
          allData[i].files[j].title = this.newFileForm.value.fileName
          localStorage.setItem('allData', JSON.stringify(allData))
          this.commanServices.sendClickEvent();
          this.close()
        }
      }
    }
  }

}
