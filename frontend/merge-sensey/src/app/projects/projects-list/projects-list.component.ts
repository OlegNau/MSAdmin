import { Component, DestroyRef, inject } from '@angular/core';
import { ProjectService } from '../../proxy/projects';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { BehaviorSubject, combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { ProjectDto } from '../../proxy/projects/dtos';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { BreakpointService } from '../../core/services/breakpoint/breakpoint.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ViewState } from '../../core/enums/view-state.enum';

@Component({
  selector: 'app-projects-list',
  standalone: false,
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  providers: [ListService, ProjectService, BreakpointService],
})
export class ProjectsListComponent {
  public readonly projects$: Observable<PagedResultDto<ProjectDto>>;
  public readonly viewState$: Observable<ViewState>;
  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected readonly listService = inject(ListService);
  private readonly projectService = inject(ProjectService);
  private readonly toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.listService.maxResultCount = 10;
    const projectStreamCreator = (query) => this.projectService.getList(query);
    this.projects$ = this.listService.hookToQuery(projectStreamCreator).pipe(
      tap({
        error: () => this.toastService.error({ message: '::Toast:Error:GetProjectsList' }),
      }),
      startWith(null),
      takeUntilDestroyed(this.destroyRef),
    );

    this.viewState$ = combineLatest([
      this.listService.requestStatus$,
      this.projects$,
    ]).pipe(
      tap(() => this.isLoading$.next(true)),
      map(([status, projects]) => {
        if (status === 'loading') return ViewState.Loading;
        if (status === 'error') return ViewState.Error;
        if (status === 'success') {
          this.isLoading$.next(false);
          if (!projects || projects.items.length === 0) return ViewState.Empty;
        }
        if (status === 'idle') {
          this.isLoading$.next(false);
          return ViewState.Loaded;
        }
        return ViewState.Loading;
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  public createProject(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent);

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.projectService.create(result)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.toastService.success({ message: '::Toast:Success:CreateProject' });
                this.listService.get();
              },
              error: () => {
                this.toastService.error({ message: '::Toast:Error:CreateProject' });
              },
            });
        }
      });
  }

  public changePage(pageEvent: PageEvent): void {
    this.listService.page = pageEvent.pageIndex;
  }
}
