import { Injectable } from '@angular/core';
import {NotificationMessage} from '../components/notification/notification-message';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  messages: NotificationMessage[] = [];


  constructor(
    private toastr: ToastrService
  ) { }



  add(message: NotificationMessage) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  showMessage(type: string, title: string, message: string) {
    const msg = new NotificationMessage();
    msg.type = type;
    msg.title = title;
    msg.message = message;

    this.add(msg);
  }

  showSnackbar(type: string, title: string, message: string){
    switch (type) {
      case 'primary':
      case 'secondary':
      case 'info':
      case 'light':
      case 'dark':
        this.toastr.info(message, title);
        break;

      case 'success':
        this.toastr.success(message, title);
        break;

      case 'warning':
        this.toastr.warning(message, title);
        break;

      case 'danger':
        this.toastr.error(message, title);
        break;

      default:
        this.toastr.info(message, title);
        break;

    }
  }
}
