import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Array<any>, searchTerm: string): any {
    if(value && searchTerm){
      return value.filter((obj)=>{
       return  obj.name.indexOf(searchTerm.toLowerCase())>-1 ||
       obj.discription.indexOf(searchTerm.toLowerCase()) >-1
       })
     }else{
       return value;
     }
  }

}
