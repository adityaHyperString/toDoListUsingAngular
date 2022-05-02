import { Injectable } from '@angular/core';
import { Observable,of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor() { }
 public getId(id): Observable<any> {
    return of(id)
  }
}
