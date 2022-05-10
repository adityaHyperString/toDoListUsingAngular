import { Component, OnInit } from '@angular/core';

// SERVICES
import { CommonFunctionServiceService } from '../services/common-function-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  file: any;

  constructor(private _commonFunctionService: CommonFunctionServiceService) {
    this._commonFunctionService.file.subscribe((response) => {
      if (response) {
        this.file = response;
      }
    });
  }

  ngOnInit(): void {}

  addTodo() {}
}
