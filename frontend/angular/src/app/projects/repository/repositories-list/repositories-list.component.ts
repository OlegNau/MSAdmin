import { Component, DestroyRef, inject } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateRepositoryComponent } from '../create-repository/create-repository.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RepositoryDto } from '../../../proxy/repositories/dtos';
import { RepositoryService } from '../../../proxy/repositories';
import { ViewState } from '../../../core/enums/view-state.enum';
import { ToastService } from '../../../shared/services/toast/toast.service';

@Component({
  selector: 'app-repositories-list',
  standalone: false,
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.scss',
  providers: [ListService],
})
export class RepositoriesListComponent {
  public readonly viewState$: Observable<ViewState>;
  public readonly columns = ['name', 'url', 'webhookUrl', 'projectId', 'isActive'];
  public readonly repositories$: Observable<PagedResultDto<RepositoryDto>>;
  public readonly currentProjectId: string = inject(ActivatedRoute).snapshot.params['projectId'];
  protected readonly listService = inject(ListService);
  private readonly repositoryService = inject(RepositoryService);
  private readonly toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.listService.maxResultCount = 10;

    const repositoryStreamCreator = (query) => this.repositoryService.getList(query, {});
    this.repositories$ = this.listService.hookToQuery(repositoryStreamCreator).pipe(
      tap({
        error: () => this.toastService.error({ message: '::Toast:Error:GetRepositoriesList' }),
      }),
      startWith(null),
      takeUntilDestroyed(this.destroyRef),
    );

    this.viewState$ = combineLatest([
      this.listService.requestStatus$,
      this.repositories$,
    ]).pipe(
      map(([status, projects]) => {
        if (status === 'loading') return ViewState.Loading;
        if (status === 'error') return ViewState.Error;
        if (status === 'success') {
          if (!projects || projects.items.length === 0) return ViewState.Empty;
        }
        if (status === 'idle') {
          return ViewState.Loaded;
        }
        return ViewState.Loading;
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  public createRepository(): void {
    const dialogRef = this.dialog.open(CreateRepositoryComponent);
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.repositoryService.create({
          ...result,
          projectId: this.currentProjectId,
        }).pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.listService.get();
          });
      }
    });
  }

  public changePage(pageEvent: PageEvent): void {
    this.listService.page = pageEvent.pageIndex;
  }

  public changeSort(sort: Sort): void {
    this.listService.sortKey = sort.active;
    this.listService.sortOrder = sort.direction;
  }

  public toggleActive(row: RepositoryDto, newValue: boolean): void {
    this.repositoryService
      .toggleActiveByIdAndInput(row.id, { isActive: newValue })
      .subscribe(() => (row.isActive = newValue));
  }
}
