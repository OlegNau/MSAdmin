import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import type { ProjectDto } from '../../proxy/projects/dtos/models';
import { map, take } from 'rxjs';

interface Project extends ProjectDto {
  provider?: 'GitHub' | 'GitLab' | 'Bitbucket';
  repoPath?: string;
  branch?: string;
  active?: number;
  total?: number;
}

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
  public readonly projects = signal<Project[]>([]);

  ngOnInit(): void {
    this.projectService
      .getList({ skipCount: 0, maxResultCount: 100 })
      .pipe(
        map(res => res?.items ?? []),
        map(items =>
          items.map<Project>(p => ({
            ...p,
            repoPath: (p as any).repoPath ?? '',
            branch: (p as any).branch ?? '',
            active: (p as any).active ?? 0,
            total: (p as any).total ?? 0,
          })),
        ),
        take(1),
      )
      .subscribe(items => this.projects.set(items));
  }
}
