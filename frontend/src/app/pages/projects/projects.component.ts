import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import { RepositoryService } from '../../proxy/repositories/repository.service';
import type { ProjectDto } from '../../proxy/projects/dtos/models';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly repositoryService = inject(RepositoryService);

  public readonly projects = signal<ProjectDto[]>([]);
  public readonly repoStats = signal<Record<string, { active: number; total: number }>>({});

  ngOnInit(): void {
    this.projectService
      .getList({ skipCount: 0, maxResultCount: 100 })
      .pipe(
        map(res => res?.items ?? []),
        take(1),
      )
      .subscribe(items => this.projects.set(items));
  }

  loadRepoStats(projectId: string): void {
    if (this.repoStats()[projectId]) {
      return;
    }

    // TODO(api): server-side aggregation endpoint for repository counts by project
    this.repositoryService
      .getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        map(res => res.items?.filter(r => r.projectId === projectId) ?? []),
        map(list => ({
          total: list.length,
          active: list.filter(r => r.isActive).length,
        })),
        take(1),
      )
      .subscribe(stats =>
        this.repoStats.update(prev => ({ ...prev, [projectId]: stats })),
      );
  }
}
