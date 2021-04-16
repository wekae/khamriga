import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnChanges {

  @ViewChild('alert', { static: false }) alert: ElementRef;

  constructor(
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  closeAlert() {
    this.notificationService.clear();
    this.alert.nativeElement.classList.remove('show');
  }
}
