import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NbDialogService } from '@nebular/theme';
import { OpenFileComponent } from "../open-file/open-file.component";
@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  flag: any;
  list: any;
  fileImage: any;
  attachedFiles: any[];
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 3 };
  constructor(
    private snackBar: MatSnackBar,
    private dialoagService: NbDialogService
  ) { }

  ngOnInit(): void {
    if (this.flag == 1) {
      this.showAttachedFiles();
    }
  }

  //USED TO UPLOAD FILES (ONLY IMAGES,PDF AND CSV FILES)
  onChange(event: any) {
    let allData = JSON.parse(localStorage.getItem('allData'))
    let file = (event.target as HTMLInputElement).files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    let ext = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'pdf') {
      fileReader.onload = () => {
        for (let i = 0; i < allData.length; i++) {
          for (let j = 0; j < allData[i].files.length; j++) {
            for (let k = 0; k < allData[i].files[j].todos.length; k++) {
              if (allData[i].files[j].todos[k].id == this.list.id) {
                if (ext.toLowerCase() == 'pdf') {
                  this.fileImage = '../../assets/pdf.jpeg'
                } if (ext.toLowerCase() == 'csv') {
                  this.fileImage = '../../assets/csv.png'
                } if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
                  this.fileImage = JSON.parse(JSON.stringify(fileReader.result))
                }
                allData[i].files[j].todos[k].attachedFiles.push({
                  file: JSON.stringify(fileReader.result),
                  fileName: file.name.split('.'),
                  fileImage: this.fileImage
                })
              }
            }
          }
        }
        localStorage.setItem('allData', JSON.stringify(allData))
        this.showAttachedFiles();
        this.snackBar.open("File added Successfully", 'ok', {
          duration: 3000,
        });
      }

    } else {
      this.snackBar.open("only image,csv and pdf files are allowed", 'ok', {
        duration: 3000,
      });
    }
  }

  //USED TO SHOW UPLOADED FILES
  showAttachedFiles() {
    let allData = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        for (let k = 0; k < allData[i].files[j].todos.length; k++) {
          if (allData[i].files[j].todos[k].id == this.list.id) {
            this.attachedFiles = allData[i].files[j].todos[k].attachedFiles
          }
        }
      }
    }
  }

  //USED TO OPEN FILE IN ANOTHER POPUP
  openFile(files) {
    this.dialoagService.open(OpenFileComponent, {
      context: {
        file: files
      }
    })
  }

  //USED TO DELETE A FILE FROM LOCAL STORAGE
  deleteFile(files, index) {
    let allData = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        for (let k = 0; k < allData[i].files[j].todos.length; k++) {
          for (let l = 0; l < allData[i].files[j].todos[k].attachedFiles.length; l++) {
            if (allData[i].files[j].todos[k].attachedFiles[l].file == files.file) {
              allData[i].files[j].todos[k].attachedFiles.splice(index, 1)
            }
          }
        }
      }
    }
    localStorage.setItem('allData', JSON.stringify(allData))
    this.showAttachedFiles();
    this.snackBar.open("File deleted Successfully", 'ok', {
      duration: 3000,
    });
  }

}


