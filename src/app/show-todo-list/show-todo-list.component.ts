import { Component, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTodoListComponent } from '../add-todo-list/add-todo-list.component';
import { UpdateTodoListComponent } from '../update-todo-list/update-todo-list.component';
import { ConfirmBoxComponent } from "../confirm-box/confirm-box.component";


@Component({
  selector: 'app-show-todo-list',
  templateUrl: './show-todo-list.component.html',
  styleUrls: ['./show-todo-list.component.css']
})
export class ShowTodoListComponent implements OnInit {
  storedNotes: any = [];
  notesObj: any = [];
  emptyMsg: any;
  isChecked = false;
  card: any;
  index: any;
  editButton = true;
  getData: any;
  txtSearch: string = '';
  deletedData: any = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showNotes();
  }

  //showNotes function is used to show data that stored in localStorage
  showNotes() {
    if (this.storedNotes != null) {
      this.storedNotes = localStorage.getItem('notes');
      this.notesObj = JSON.parse(this.storedNotes);
    } else {
      this.emptyMsg = "there is no to dos"
    }

  }

  openConfirmDialog() {
    return this.dialog.open(ConfirmBoxComponent)
  }

  //deleteNotes() used to delete perticular data from localStorage
  deleteNote(index) {
    this.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.notesObj = JSON.parse(this.storedNotes);
        this.deletedData = this.notesObj.splice(index, 1)
        console.log('delted data', this.deletedData);
        localStorage.setItem('deletedData', JSON.stringify(this.deletedData));
        localStorage.setItem("notes", JSON.stringify(this.notesObj));

        this.ngOnInit();
      } else {
        this.ngOnInit();
      }

    })

  }

  editNote(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"

    const dialogRref = this.dialog.open(UpdateTodoListComponent, {
      data: { note: this.notesObj[index], index },
    })

    dialogRref.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
        this.notesObj[index] = result;
        this.ngOnInit();
      }
    })
  }

  removeDuplicates() {
    console.log('inside remove');
    this.getData = localStorage.getItem('notes')
    this.notesObj = JSON.parse(this.getData)
    console.log(this.notesObj);

    const uniqueValues = [...this.notesObj.reduce((map, obj) => map.set(obj.title.toLowerCase(), obj), new Map()).values()];
    localStorage.setItem("notes", JSON.stringify(uniqueValues));
    this.ngOnInit();

  }



}
