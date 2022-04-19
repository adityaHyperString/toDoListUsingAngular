import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: any;
  searchForm: FormGroup;
  notesObj: any = [];
  txtSearch: string = '';
  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.searchForm = this.fb.group({

      "searchTxt": new FormControl(''),

    });


  }

  onKeyUpSearch() {
    console.log('inside search');

    let searchField = this.searchForm.get('searchTxt').value.toLowerCase();
    console.log(searchField);

    let getNotes = localStorage.getItem('notes')
    this.notesObj = JSON.parse(getNotes)
    console.log(this.notesObj[0].title);
    for (let i = 0; i <= this.notesObj.length - 1; i++) {

      if (searchField == this.notesObj[i].title.toLowerCase()) {
        console.log('match');

      }
      //  else {
      //   console.log('Not match');
      // }
    }





  }

}
