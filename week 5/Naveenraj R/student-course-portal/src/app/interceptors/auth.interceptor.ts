// Hands-On 8, Task 3, step 88 — functional HttpInterceptorFn, registered via withInterceptors().
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: { Authorization: 'Bearer mock-token-12345' }
  });
  return next(cloned);
};
