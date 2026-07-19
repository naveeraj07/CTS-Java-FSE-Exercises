// Hands-On 7, Task 2 — backs the AuthGuard. Hardcoded for the exercise.
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true;
}
