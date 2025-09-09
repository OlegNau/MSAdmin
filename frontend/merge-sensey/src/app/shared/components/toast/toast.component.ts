import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { Toast } from '../../services/toast/toast.model';
import { toastAnimation } from '../../aniamtion/toast.animation';

@Component({
  standalone: false,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
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
