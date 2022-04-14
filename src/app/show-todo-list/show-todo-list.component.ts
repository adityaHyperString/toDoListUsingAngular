import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTodoListComponent } from '../add-todo-list/add-todo-list.component';
import { UpdateTodoListComponent } from '../update-todo-list/update-todo-list.component';

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

  //deleteNotes() used to delete perticular data from localStorage
  deleteNote(index) {
    this.notesObj = JSON.parse(this.storedNotes);
    this.notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(this.notesObj));
    this.ngOnInit();
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
      }
    })
  }
  markDone(e, i) {

    console.log(i);
    this.card = document.getElementById('card');
    if (e.target.checked == true) {
      console.log('checkbox is true');
      this.card.style.backgroundColor = "#d2e2e2"
    } else {
      console.log('checkbox is false');
      this.card.style.backgroundColor = "#FFFFFF"
    }


  }
  removeDuplicates() {
    console.log('inside remove');
    this.getData = localStorage.getItem('notes')
    this.notesObj = JSON.parse(this.getData)
    console.log(this.notesObj);

    const uniqueValues = [...this.notesObj.reduce((map, obj) => map.set(obj.title.toLowerCase(), obj), new Map()).values()];
    console.log('unique', uniqueValues);
    localStorage.setItem("notes", JSON.stringify(uniqueValues));
    this.ngOnInit();

  }

  search() {
    console.log('search');
    let search = document.getElementById('searchText');

    // let filter = search.value.toUpperCase();


  }

}
