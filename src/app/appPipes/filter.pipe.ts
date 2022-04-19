import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, searchTerm: string): any {
    // return value.filter(function (search) {
    //   return search.note.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      // });


    if(value && searchTerm){
     return value.filter((obj)=>{
      return  obj.title.indexOf(searchTerm.toLowerCase())>-1 ||
      obj.note.indexOf(searchTerm.toLowerCase()) >-1 || obj.id.indexOf(searchTerm) > -1
      })
    }else{
      return value;
    }
  }

}
