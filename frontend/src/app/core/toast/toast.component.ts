import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbpLocalizationPipe } from '@abp/ng.core';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';
import { toastAnimation } from './toast.animation';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, AbpLocalizationPipe],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastAnimation],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.toastService
      .getToasts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(toasts => {
        this.toasts = toasts;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getClass(toast: Toast): string {
    return `app-toast app-toast--${toast.type}`;
  }

  getTitle(toast: Toast): string {
    return toast.title ?? `::Toast:${toast.type}:DefaultTitle`;
  }

  trackById(index: number, toast: Toast): number {
    return toast.id;
  }
}
