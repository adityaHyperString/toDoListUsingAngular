import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  flag:any;
  list:any;
  constructor(
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


onChange(event: any) {

    let allData= JSON.parse(localStorage.getItem('allData'))
    let file = (event.target as HTMLInputElement).files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    let ext =  file.name.substring( file.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'pdf') {
      fileReader.onload = () => {
      for (let i = 0; i < allData.length; i++) {
        for (let j = 0; j < allData[i].files.length; j++) {
          for (let k = 0; k < allData[i].files[j].todos.length; k++) {
            if (allData[i].files[j].todos[k].id==this.list.id) {

              allData[i].files[j].todos[k].attachedFiles.push({
                   file:JSON.stringify(fileReader.result),
                   fileName:file.name
              })
            }

          }

        }

      }
      localStorage.setItem('allData',JSON.stringify(allData))
      }

    } else {
      this.snackBar.open("only image,csv and pdf files are allowed", 'ok', {
        duration: 3000,
      });

    }

  }

}
