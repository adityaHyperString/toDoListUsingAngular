import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, } from "@angular/forms";

// SERVICES
import { NbDialogRef } from '@nebular/theme';
import { CommonFunctionServiceService } from "../../services/common-function-service.service";


@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
})
export class AddFolderComponent implements OnInit {
  newFolderForm: FormGroup;
  folders: any[];

  constructor(
    private fb: FormBuilder,
    private nbDialogRef: NbDialogRef<any>,
    private commanServices: CommonFunctionServiceService,

  ) { }


  ngOnInit(): void {
    this.newFolderForm = this.fb.group({
      "folderName": new FormControl(),
    });

  }

  //TO SAVE OR PUSH FOLEDER IN LOCALSTORAGE
  save() {
    let allData = localStorage.getItem('allData')
    if (allData == null) {
      this.folders = [];
    } else {
      this.folders = JSON.parse(allData);
    }
    this.folders.push({
      id: Math.floor(Math.random() * 900000).toString(),
      folderName: this.newFolderForm.value.folderName,
      files: []
    })
    localStorage.setItem('allData', JSON.stringify(this.folders))
    this.commanServices.sendClickEvent();
    this.nbDialogRef.close();

  }

  //TO CLOSE DIALOG BOX
  close() {
    this.nbDialogRef.close();
  }

}
