// Hands-On 6, Task 2, step 67 — provided at COMPONENT level (see NotificationComponent),
// so each component that provides it gets its own isolated instance/state.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  notify(message: string): void {
    this.messageSubject.next(message);
  }

  clear(): void {
    this.messageSubject.next(null);
  }
}
