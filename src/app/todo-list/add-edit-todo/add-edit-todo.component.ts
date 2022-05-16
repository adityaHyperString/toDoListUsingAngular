import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, } from "@angular/forms";


//SERVICES
import { NbDialogRef } from '@nebular/theme';
import { CommonFunctionServiceService } from "../../services/common-function-service.service";


@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent implements OnInit {
  newTodoForm: FormGroup
  flag: any;
  list: any;

  file: any;
  editedFile: any;
  fileName: string;

  constructor(
    private nbDialogRef: NbDialogRef<any>,

    private fb: FormBuilder,
    private commanSerives: CommonFunctionServiceService
  ) { }

  ngOnInit(): void {
    this.newTodoForm = this.fb.group({
      "name": new FormControl(this.list?.name),
      "discription": new FormControl(this.list?.discription),

    });

  }

  //USED TO SAVE AND PUSH TODOS IN PARTICULAR FILE
  save() {
    let fileId = localStorage.getItem('fileId')
    let allData = JSON.parse(localStorage.getItem('allData'))
    // if (this.file == null) {
    //   this.file = 'no Image'
    // } else {
    //   this.file = JSON.parse(this.file)
    // }
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        if (allData[i].files[j].id == fileId) {
          allData[i].files[j].todos.push({
            id: Math.floor(Math.random() * 900000).toString(),
            name: this.newTodoForm.value.name,
            discription: this.newTodoForm.value.discription,
            attachedFiles: []

          })
        }
      }
    }
    localStorage.setItem('allData', JSON.stringify(allData))
    this.nbDialogRef.close();
    this.commanSerives.sendClickEvent();
  }

  //USED TO EDIT TODOS FROM PARTICULAR FILE
  edit() {
    let fileId = localStorage.getItem('fileId')
    let allData = JSON.parse(localStorage.getItem('allData'))
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].files.length; j++) {
        if (allData[i].files[j].id == fileId) {
          for (let k = 0; k < allData[i].files[j].todos.length; k++) {
            if (allData[i].files[j].todos[k].id == this.list?.id) {
              allData[i].files[j].todos[k].name = this.newTodoForm.value.name
              allData[i].files[j].todos[k].discription = this.newTodoForm.value.discription
              // if (this.editedFile != null && this.fileName != null) {
              //   allData[i].files[j].todos[k].fileName = this.fileName
              //   allData[i].files[j].todos[k].image = JSON.parse(this.editedFile)
              // }

            }
          }
        }
      }
    }
    localStorage.setItem('allData', JSON.stringify(allData))
    this.nbDialogRef.close();
    this.commanSerives.sendClickEvent();
  }

  //USED TO CLOSE DIALOG
  close() {
    this.nbDialogRef.close();
  }

  //TO UPLOAD NEW IMAGE
  // onChange(event: any) {
  //   let file = (event.target as HTMLInputElement).files[0];
  //   let fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   let ext =  file.name.substring( file.name.lastIndexOf('.') + 1);
  //   if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'pdf') {
  //     fileReader.onload = () => {
  //       this.fileName = file.name;
  //       this.file = JSON.stringify(fileReader.result)
  //     }
  //   } else {
  //     this.snackBar.open("only image,csv and pdf files are allowed", 'ok', {
  //       duration: 3000,
  //     });

  //   }

  // }

  // TO EDIT IMAGE FROM PERTICULAR TODO
  // onEditChange(event: any) {
  //   let file = (event.target as HTMLInputElement).files[0];
  //   this.fileName = file.name;
  //   let fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.onload = () => {
  //     this.editedFile = JSON.stringify(fileReader.result)

  //   }
  // }


}
