import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {
  id: any;

  constructor() { }
  public getId(id): Observable<any> {
    return of(this.id)
  }

  public sub = new Subject<any>();
  sendClickEvent(){
    this.sub.next(this.id)
  }

  getClickEvent():Observable<any>{
    return this.sub.asObservable();
  }

  public searchText = new BehaviorSubject<string>('');
  currentSearchText = this.searchText.asObservable();


  changeSearchText(txt: string) {
    this.searchText.next(txt)
  }



}
