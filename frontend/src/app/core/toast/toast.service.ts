import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Toast, ToastOptions } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toasts: Toast[] = [];
  private readonly toasts$ = new ReplaySubject<Toast[]>(1);

  getToasts(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  success(options: ToastOptions): void {
    this.show(new Toast('success', options));
  }

  error(options: ToastOptions): void {
    this.show(new Toast('error', options));
  }

  hide(id: number): void {
    const index = this.toasts.findIndex(t => t.id === id);
    if (index >= 0) {
      this.toasts.splice(index, 1);
    }
    this.toasts$.next(this.toasts);
  }

  private show(toast: Toast): void {
    this.toasts.push(toast);
    this.toasts$.next(this.toasts);
    if (toast.duration != null) {
      setTimeout(() => this.hide(toast.id), toast.duration);
    }
  }
}
