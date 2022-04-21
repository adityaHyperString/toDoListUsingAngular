import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UpdateTodoListComponent } from '../update-todo-list/update-todo-list.component';
import { ConfirmBoxComponent } from "../confirm-box/confirm-box.component";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-show-todo-list',
  templateUrl: `./show-todo-list.component.html`,
  styleUrls: ['./show-todo-list.component.css']
})
export class ShowTodoListComponent implements OnInit {
  storedNotes: any = [];
  notesObj: any = [];
  emptyMsg: any;
  isChecked = false;
  index: any;
  editButton = true;
  getData: any;
  txtSearch: string = '';
  deletedData: any = [];
  newData: any;
  newDeltedArrayData: any = [];
  myObj: any;

  @ViewChild('confirmBox', { static: false }) confirmBox: ConfirmBoxComponent;
  cardBody: any = [];
  constructor(private dialog: MatDialog, public _snackBar: MatSnackBar) { }

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
        this.openSnackBar()
        this.ngOnInit();
      } else {
        this.ngOnInit();
      }
    })
  }

  openSnackBar() {
    let snackbarRef = this._snackBar.open("Data Deleted!", 'UNDO', {
      duration: 3000,

    });
    snackbarRef.onAction().subscribe(() => {

      this.deletedData = localStorage.getItem('deletedData');
      this.newData = localStorage.getItem('notes')
      this.newDeltedArrayData = JSON.parse(this.deletedData)
      this.notesObj = JSON.parse(this.newData)
      this.myObj = {
        id: this.newDeltedArrayData[0].id,
        title: this.newDeltedArrayData[0].title,
        note: this.newDeltedArrayData[0].note
      }
      this.notesObj.push(this.myObj);
      localStorage.setItem("notes", JSON.stringify(this.notesObj));
      this.showNotes();

    })
    snackbarRef.afterDismissed().subscribe(() => {
      localStorage.removeItem('deletedData');
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



  markDone(event: any) {
    let data = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
    if (event.target.checked) {
      data.style.backgroundColor = "#d2e2e2"
    } else {
      data.style.backgroundColor = "#ffffff"

    }


  }


}
