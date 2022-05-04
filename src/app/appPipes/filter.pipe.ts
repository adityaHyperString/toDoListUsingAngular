import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, searchTerm: string): any {



    if (value && searchTerm) {
      let fileId = localStorage.getItem('fileId')
      return value.filter((obj) => {


        return obj.name.indexOf(searchTerm.toLowerCase()) > -1 ||
        obj.discription.indexOf(searchTerm.toLowerCase()) > -1 || obj.id.indexOf(searchTerm) > -1



      })
    } else {
      return value;
    }
  }

}
