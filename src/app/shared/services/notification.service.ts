import { Injectable } from '@angular/core';
import {NotificationMessage} from '../components/notification/notification-message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  messages: NotificationMessage[] = [];


  constructor() { }



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
}
