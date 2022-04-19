import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  deletedData: any;
  newData: any;
  newDeltedArrayData: any = [];
  newArrayData: any = [];
  undoData: any = [];
  notesObj: any = [];
  myObj: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

    })

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
