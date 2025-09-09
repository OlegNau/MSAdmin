import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import type { ProjectDto } from '../../proxy/projects/dtos/models';

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
      .getList({ skipCount: 0, maxResultCount: 100, sorting: undefined })
      .subscribe(res => {
        this.projects.set(
          res.items.map(p => ({
            ...p,
            provider: '',
            repoPath: '',
            branch: '',
            active: 0,
            total: 0,
          })),
        );
      });
  }
}
