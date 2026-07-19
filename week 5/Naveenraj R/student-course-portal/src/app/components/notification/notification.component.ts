import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  // Component-level provider: every <app-notification> instance (and its children) gets its
  // own NotificationService instance, isolated from the root-level singleton services.
  providers: [NotificationService],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  message$ = this.notificationService.message$;
}
