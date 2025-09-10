import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import type { ProjectListItem } from './models/project-list-item.model';
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

  public readonly projects = signal<ProjectListItem[]>([]);

  ngOnInit(): void {
    this.projectService
      .getList({ skipCount: 0, maxResultCount: 100 })
      .pipe(
        map(res =>
          res?.items?.map(p => ({
            id: p.id!,
            name: p.name ?? '',
            description: p.description,
          })) ?? [],
        ),
        take(1),
      )
      .subscribe(items => this.projects.set(items));
  }

  // TODO(repositories): display repository statistics once repository module is integrated
}
