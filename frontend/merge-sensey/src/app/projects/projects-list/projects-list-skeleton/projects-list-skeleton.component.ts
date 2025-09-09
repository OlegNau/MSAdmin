import { Component, DestroyRef, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointService } from '../../../core/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-projects-list-skeleton',
  standalone: false,
  templateUrl: './projects-list-skeleton.component.html',
  styleUrl: './projects-list-skeleton.component.scss',
})
export class ProjectsListSkeletonComponent {
  private readonly breakpointService = inject(BreakpointService);
  private readonly destroyRef = inject(DestroyRef);

  public cols$ = combineLatest([
    this.breakpointService.isMobile$,
    this.breakpointService.isTablet$,
    this.breakpointService.isDesktop$,
  ]).pipe(
    map(([mobile, tablet]) => mobile ? 1 : tablet ? 2 : 3),
    takeUntilDestroyed(this.destroyRef),
  );
}
