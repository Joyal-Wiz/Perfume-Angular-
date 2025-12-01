import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  message = '';
  type = 'success';
  showToast = false;

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.toast.toastState.subscribe((data: any) => {
      this.message = data.message;
      this.type = data.type;
      this.showToast = true;

      setTimeout(() => this.showToast = false, 2500);
    });
  }
}
