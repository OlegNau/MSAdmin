import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Toast, ToastOptions } from './toast.model';

@Injectable()
export class ToastService {
  private readonly toasts: Toast[] = [];
  private readonly toasts$: ReplaySubject<Toast[]> = new ReplaySubject<Toast[]>();

  public getToasts(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  public success(options: ToastOptions): void {
    this.show(new Toast('success', options));
  }

  public error(options: ToastOptions): void {
    this.show(new Toast('error', options));
  }

  public hide(toastId: number): void {
    const index: number = this.toasts.findIndex((toast: Toast) => toast.id === toastId);
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
