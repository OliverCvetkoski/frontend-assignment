import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @Input() show: boolean = false;
  @Input() content: string = '';
  @Input() backgroundColor: string = '#33ca38';
}
