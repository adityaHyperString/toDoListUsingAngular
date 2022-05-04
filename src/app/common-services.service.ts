import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor() { }
  public getId(id): Observable<any> {
    return of(id)
  }
  public searchText = new BehaviorSubject<string>('');
  currentSearchText = this.searchText.asObservable();

  changeSearchText(txt: string) {
    this.searchText.next(txt)
  }
}
