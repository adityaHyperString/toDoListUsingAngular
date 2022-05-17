import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss']
})
export class OpenFileComponent implements OnInit {
  file:any;
  openFile: any;
  constructor() { }

  ngOnInit(): void {
    this.openFile = JSON.parse(this.file.file)
  }

}
