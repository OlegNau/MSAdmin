import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LocalizationPipe } from '@abp/ng.core';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';
import { toastAnimation } from '../../shared/aniamtion/toast.animation';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LocalizationPipe],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastAnimation],
})
export class ToastComponent implements OnInit, OnDestroy {
  public toasts: Toast[] = [];

  private readonly subscriptionDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly toastService: ToastService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.toastService.getToasts()
      .pipe(takeUntil(this.subscriptionDestroy$))
      .subscribe({
        next: (toasts: Toast[]) => {
          this.toasts = toasts;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
  }

  public getClass(toast: Toast): string {
    return `app-toast app-toast--${toast.type}`;
  }

  public getTitle(toast: Toast): string {
    return toast.title ? toast.title : `::Toast:${toast.type}:DefaultTitle`;
  }

  public toastTrackBy(index: number, toast: Toast): number {
    return toast.id;
  }
}
