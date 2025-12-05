import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastState = new Subject<any>();

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toastState.next({ message, type });
  }
  
}
