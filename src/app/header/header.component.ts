import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonServicesService } from "../common-services.service";
import { AddTodoListComponent } from "../add-todo-list/add-todo-list.component";
// import { timeStamp } from 'console';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search: any;
  searchForm: FormGroup;
  notesObj: any = [];
  txtSearch: any;
  @ViewChild('childComponent', { static: false }) childComponent: AddTodoListComponent;
  constructor(private fb: FormBuilder, public commonService: CommonServicesService) { }
  txt: string;


  ngOnInit(): void {
    this.commonService.currentSearchText.subscribe(txt => this.txt = txt)
    this.searchForm = this.fb.group({
      "searchElement": new FormControl(''),
    });


  }


  onKeyUpSearch(event: any) {
    this.txtSearch = this.searchForm.value.searchElement
    this.commonService.changeSearchText(this.txtSearch)
  }



}
