import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private showGenerativeMenuSubject = new BehaviorSubject<any>('');
  showGenerativeMenu$ = this.showGenerativeMenuSubject.asObservable();

  setShowGenerativeMenu(value: any) {
    this.showGenerativeMenuSubject.next(value);
  }
}
