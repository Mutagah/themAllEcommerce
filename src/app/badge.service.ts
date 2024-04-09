import { Injectable } from '@angular/core';

/*Rxjs imports */
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  private badgeCountSubject = new Subject<number>();
  badgeCount$ = this.badgeCountSubject.asObservable();

  incrementBadgeCount(): void {
    this.badgeCountSubject.next(1);
  }

  decrementBadgeCount(): void {
    this.badgeCountSubject.next(-1);
  }

  resetBadgeCount(): void {
    this.badgeCountSubject.next(0);
  }
}
