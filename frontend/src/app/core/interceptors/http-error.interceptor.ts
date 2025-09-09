import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 400) {
        const message =
          (error.error && (error.error.error?.message || error.error.message)) ||
          error.statusText ||
          'Error';

        toast.error({ message });

        if (error.status === 401 || error.status === 403) {
          router.navigate(['/account/login']);
        }
      }

      return throwError(() => error);
    }),
  );
};
