import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-todo-list',
  templateUrl: './show-todo-list.component.html',
  styleUrls: ['./show-todo-list.component.css']
})
export class ShowTodoListComponent implements OnInit {
  storedNotes:any=[];
  notesObj:any=[];
  emptyMsg:any;
  constructor() { }

  ngOnInit(): void {
    this.showNotes();
  }

  //showNotes function is used to show data that stored in localStorage
  showNotes(){
    if (this.storedNotes != null) {
      this.storedNotes = localStorage.getItem('notes');
      this.notesObj = JSON.parse(this.storedNotes);
    } else {
      this.emptyMsg="there is no to dos"
    }
  }

  //deleteNotes() used to delete perticular data from localStorage
  deleteNote(index){
    this.notesObj = JSON.parse(this.storedNotes);
    this.notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(this.notesObj));
    this.ngOnInit();
  }

  editNote(index){
    console.log('edit clicked');
    console.log(index);
  }
}
