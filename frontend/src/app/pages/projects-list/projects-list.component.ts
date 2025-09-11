import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../proxy/projects/project.service';
import { RepositoryService } from '../../proxy/repositories/repository.service';
import { PipelineService } from '../../proxy/pipelines/pipeline.service';
import { take, map, forkJoin, of, switchMap, finalize } from 'rxjs';
import { ToastService } from '../../core/toast/toast.service';
import { ProjectCardComponent, ProjectListItem } from './components/project-card/project-card.component';
import { SkeletonDirective } from '../../shared/directives/skeleton/skeleton.directive';
import { StubComponent } from '../../shared/components/stub/stub.component';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, SkeletonDirective, StubComponent],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly repositoryService = inject(RepositoryService);
  private readonly pipelineService = inject(PipelineService);
  private readonly toast = inject(ToastService);

  public readonly loading = signal<boolean>(true);
  public readonly error = signal<boolean>(false);
  public readonly items = signal<ProjectListItem[]>([]);

  ngOnInit(): void {
    this.load();
  }

  // ---- public actions ----
  public onCreateProject(): void {
    // TODO: navigate to create-project page
    this.toast.success({ message: 'Navigate to Create Project (TODO)' });
  }

  // ---- data loading (split by steps) ----
  private load(): void {
    this.loading.set(true);
    this.error.set(false);

    this.loadProjects()
      .pipe(
        switchMap(projects => this.loadAggregates(projects)),
        finalize(() => this.loading.set(false)),
        take(1),
      )
      .subscribe({
        next: result => this.items.set(result),
        error: () => {
          this.error.set(true);
          this.toast.error({ message: 'Failed to load projects' });
        },
      });
  }

  private loadProjects() {
    return this.projectService.getList({ skipCount: 0, maxResultCount: 1000 }).pipe(
      map(res => (res.items ?? []).map(p => ({
        id: p.id!,
        name: p.name ?? '',
        description: p.description ?? '',
      }))),
    );
  }

  private loadAggregates(projects: Array<{ id: string; name: string; description?: string }>) {
    if (projects.length === 0) return of([] as ProjectListItem[]);
    const perProject$ = projects.map(p =>
      forkJoin({
        repos: this.repositoryService.getList({ skipCount: 0, maxResultCount: 1000 }).pipe(
          map(res => (res.items ?? []).filter(r => r.projectId === p.id).map(r => ({
            id: r.id!, name: r.name ?? '', url: r.url ?? '',
          }))),
          take(1)
        ),
        pipes: this.pipelineService.getList({ skipCount: 0, maxResultCount: 1000 }).pipe(
          map(res => (res.items ?? []).filter((x: any) => (x as any).projectId === p.id).map((x: any) => ({
            id: x.id!, name: x.name ?? x.id!.slice(0,8), lastRun: x.startedAt ?? null,
          }))),
          take(1)
        ),
      }).pipe(
        map(({ repos, pipes }) => ({
          id: p.id, name: p.name, description: p.description,
          repositories: repos, pipelines: pipes,
        }) as ProjectListItem),
        take(1)
      )
    );
    return forkJoin(perProject$);
  }
}
