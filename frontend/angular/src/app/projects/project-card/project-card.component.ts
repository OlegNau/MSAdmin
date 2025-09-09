import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ProjectDto } from '../../proxy/projects/dtos';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ListService, PagedAndSortedResultRequestDto, PagedResultDto, StopPropagationDirective } from '@abp/ng.core';
import { RepositoryService } from '../../proxy/repositories';
import { PipelineService } from '../../proxy/pipelines';
import { RepositoryDto } from '../../proxy/repositories/dtos';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { RepositoryWithMetadata } from './projects-card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  providers: [ListService],
})
export class ProjectCardComponent implements OnInit {
  @Input() public project!: ProjectDto;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public repositories$!: Observable<RepositoryWithMetadata[]>;
  protected readonly StopPropagationDirective = StopPropagationDirective;
  private repositoryService = inject(RepositoryService);
  private pipelineService = inject(PipelineService);
  private listService = inject(ListService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.initializeRepositoryStream();
  }

  public openProject(id: string): void {
    this.router.navigate([id, 'repositories'], { relativeTo: this.activatedRoute }).then();
  }

  public editProject(event: Event, project: ProjectDto): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(CreateProjectComponent, { data: project });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.repositoryService.update(project.id, result)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.toastService.success({ message: '::Toast:Success:UpdateProject' });
                this.listService.get();
              },
              error: () => {
                this.toastService.error({ message: '::Toast:Error:UpdateProject' });
              },
            });
        }
      });
  }

  private initializeRepositoryStream(): void {
    const repositoryStreamCreator = (query: PagedAndSortedResultRequestDto) =>
      this.repositoryService.getList(query);

    this.repositories$ = this.listService.hookToQuery(repositoryStreamCreator).pipe(
      tap(() => this.isLoading$.next(true)),
      switchMap((repositoryListResult: PagedResultDto<RepositoryDto> | null) => {
        if (!repositoryListResult) return of([]);

        const repositories = repositoryListResult.items;
        const observables = repositories.map(repo =>
          this.pipelineService.getList({ skipCount: 0, maxResultCount: 1000 }).pipe(
            map(pipelineListResult => {
              const lastPipelineRun = pipelineListResult.items.length
                ? new Date(Math.max(...pipelineListResult.items.map(p => p.finishedAt ? new Date(p.finishedAt).getTime() : 0)))
                : null;

              return {
                ...repo,
                platform: this.detectPlatform(repo.url ?? ''),
                platformLogo: this.getPlatformLogo(repo.url ?? ''),
                pipelineCount: pipelineListResult.items.length,
                lastPipelineRun,
              } as RepositoryWithMetadata;
            }),
            catchError(() => {
              this.toastService.error({ message: '::Toast:Error:GetPipelinesList' });
              return of(null as unknown as RepositoryWithMetadata);
            }),
          ),
        );

        return forkJoin(observables).pipe(
          tap(() => this.isLoading$.next(false)),
          catchError(() => {
            this.toastService.error({ message: '::Toast:Error:GetRepositoriesList' });
            this.isLoading$.next(false);
            return of([]);
          }),
        );
      }),
      startWith([]),
      catchError(() => {
        this.toastService.error({ message: '::Toast:Error:GetProjectsList' });
        this.isLoading$.next(false);
        return of([]);
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  private detectPlatform(url: string): string {
    if (url.includes('github.com')) return 'GitHub';
    if (url.includes('gitlab.com')) return 'GitLab';
    if (url.includes('bitbucket.com')) return 'BitBucket';
    return 'Other';
  }

  private getPlatformLogo(url: string): string {
    if (url.includes('github.com')) return 'assets/images/git/github.svg';
    if (url.includes('gitlab.com')) return 'assets/images/git/gitlab.svg';
    if (url.includes('bitbucket.com')) return 'assets/images/git/bitbucket.svg';
    return 'assets/images/git/git-default.svg';
  }
}
