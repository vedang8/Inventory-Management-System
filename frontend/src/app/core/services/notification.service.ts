import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private toastr: ToastrService,
    private wsService: WebsocketService
  ) {
    this.initLowStockNotifications();
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success', {
      toastClass: 'success-toast',
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }
  
  showError(message: string): void {
    this.toastr.error(message, 'Error', { 
      toastClass: 'error-toast',
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: false,
      tapToDismiss: false
    });
  }

  private initLowStockNotifications(): void {
    this.wsService.listen('lowStockAlert').subscribe((product: any) => {
      this.toastr.warning(`Low stock alert: ${product.product_name} (${product.quantity} left)`, 'Warning');
    });
  }
}