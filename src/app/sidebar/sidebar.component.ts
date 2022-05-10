import { Component, OnInit } from '@angular/core';

// COMPONENTS
import { AddFolderComponent } from './add-folder/add-folder.component';

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
  ) {}

  ngOnInit(): void {}

  addFolder() {
    this._dialogService.open(AddFolderComponent, {});
  }

  selectFile(file) {
    this._commonFunctionService.file.next(file);
  }
}
