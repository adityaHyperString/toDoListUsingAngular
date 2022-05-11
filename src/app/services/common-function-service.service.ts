import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class CommonFunctionServiceService {
  file: Subject<any> = new Subject();
  public sub = new Subject<any>();


  sendClickEvent(){
    this.sub.next(this.sub)
  }

  getClickEvent():Observable<any>{
    return this.sub.asObservable();
  }
  constructor() {}
}
