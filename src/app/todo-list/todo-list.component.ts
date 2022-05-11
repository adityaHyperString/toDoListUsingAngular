import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// SERVICES
import { AddEditTodoComponent } from "./add-edit-todo/add-edit-todo.component";
import { ConfirmBoxComponent } from "./confirm-box/confirm-box.component";
import { CommonFunctionServiceService } from '../services/common-function-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  file: any;
  txtSearch: string = '';
  folders: any[];

  constructor(private _commonFunctionService: CommonFunctionServiceService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this._commonFunctionService.file.subscribe((response) => {
      if (response) {
        this.file = response;
      }
    });
    this._commonFunctionService.getClickEvent().subscribe(() => {
      this.showTodo()
    })
  }

  ngOnInit(): void {
    this.showTodo()
  }

  // TO SHOW TODO LISTS OF PERTICULAR FILE
  showTodo() {
    let fileId = localStorage.getItem('fileId')
    let allData = localStorage.getItem('allData')
    if (allData == null) {
      this.folders = [];
    } else {
      this.folders = JSON.parse(allData);
    }
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].files.length; j++) {
        if (this.folders[i].files[j].id == fileId)
          this.file = this.folders[i].files[j]
      }
    }
  }

  //TO OPEN DIALOG BOX FOR ADDING TODOS IN PERTICULAR FILE
  addTodo(fileId) {
    localStorage.setItem('fileId', fileId)
    this.dialog.open(AddEditTodoComponent, {
      data: {
        flag: 0
      }
    })

  }

  //TO OPEN DIALOG BOX
  openConfirmDialog() {
    return this.dialog.open(ConfirmBoxComponent)
  }

  //TO DELETE PARTICULAR TODO FROM PARTICULAR FILE
  deleteTodo(id, index) {
    let fileId = localStorage.getItem('fileId')
    this.folders = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].files.length; j++) {
        if (this.folders[i].files[j].id == fileId) {
          for (let k = 0; k < this.folders[i].files[j].todos.length; k++) {
            if (this.folders[i].files[j].todos[k].id == id) {
              this.openConfirmDialog().afterClosed().subscribe(response => {
                if (response) {
                  let deletedData = this.folders[i].files[j].todos.splice(index, 1);
                  localStorage.setItem('deletedTodo', JSON.stringify(deletedData))
                  localStorage.setItem('allData', JSON.stringify(this.folders))
                }
                //TO SHOWTODO AFTER DELETEING FILE
                this.showTodo();
                //TO OPEN SNACKBAR
                this.openSnackBar()
              });
            }
          }
        }
      }
    }
  }

  // TO SHOW TODO IS DELETED
  openSnackBar() {
    let snackBarRef = this.snackBar.open("Data Deleted!", 'UNDO', {
      duration: 3000,
    });

    //USED TO UNDO THE DELETED TODO
    snackBarRef.onAction().subscribe(() => {
      let fileId = localStorage.getItem('fileId')
      let deletedData = JSON.parse(localStorage.getItem('deletedTodo'))
      this.folders = JSON.parse(localStorage.getItem('allData'))
      for (let i = 0; i < this.folders.length; i++) {
        for (let j = 0; j < this.folders[i].files.length; j++) {
          if (this.folders[i].files[j].id == fileId) {
            this.folders[i].files[j].todos.push({
              id: deletedData[0].id,
              name: deletedData[0].name,
              discription: deletedData[0].discription
            })
            localStorage.setItem('allData', JSON.stringify(this.folders))
            this.showTodo()
          }
        }
      }
    })

    //USED TO PERMENANTLY REMOVE DELETED TODOS FROM LOCALSTORAGE
    snackBarRef.afterDismissed().subscribe(() => {
      localStorage.removeItem('deletedTodo');
      this.showTodo();
    })
  }

  //USED TO OPEN DIALOG BOX AND PASSING LIST TO DIALOG BOX
  editToDo(list) {
    this.dialog.open(AddEditTodoComponent, {
      data: {
        flag: 1,
        list: list
      }
    })
  }


}
