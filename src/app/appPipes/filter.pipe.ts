import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, searchTerm: string): any {
    if (value && searchTerm) {
      return value.filter((object) => {
        return object.name.indexOf(searchTerm.toLowerCase()) > -1 ||
        object.id.indexOf(searchTerm) > -1
      })
    } else {
      return value;
    }
  }

}
