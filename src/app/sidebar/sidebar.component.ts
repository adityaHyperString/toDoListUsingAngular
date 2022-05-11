import { Component, OnInit } from '@angular/core';

// COMPONENTS
import { AddFolderComponent } from './add-folder/add-folder.component';
import { AddFileComponent } from "./add-file/add-file.component";

// SERVICES
import { NbDialogService } from '@nebular/theme';
import { CommonFunctionServiceService } from '../services/common-function-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  folders: any[] = [];

  constructor(
    private _dialogService: NbDialogService,
    private _commonFunctionService: CommonFunctionServiceService
  ) {
    this._commonFunctionService.getClickEvent().subscribe(() => {
      this.showFolder();
    })
  }

  ngOnInit(): void {
    this.showFolder();
  }

  //TO SHOW FOLDER NAME ON SIDEBAR
  showFolder() {
    let allData = localStorage.getItem('allData')
    if (allData == null) {
      this.folders = [];
    } else {
      this.folders = JSON.parse(allData);
    }
  }

  //TO OPEN DIALOG BOX WITH ADD FOLDER COMPONENT
  addFolder() {
    this._dialogService.open(AddFolderComponent, {
    });
  }

  //TO OPEN DIALOG BOX WITH ADD FILE COMPONENT, STORING FOLDERID IN LOCALSTORAGE
  addFile(id) {
    localStorage.setItem('folderId', id)
    this._dialogService.open(AddFileComponent, {
    });
  }

  //TO OPEN FILE IN LAYOUT COLOUMN
  selectFile(file) {
    this._commonFunctionService.file.next(file);
  }

}
