import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import { take } from 'rxjs';
import type { ProjectDetailView, PipelineRow } from './models/project-detail.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  public readonly project = signal<ProjectDetailView>({
    id: '',
    name: '',
    description: '',
    pipelines: [],
  });

  // TODO(repositories): repository and branch management will be implemented in dedicated modules

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!id) {
      this.router.navigate(['/404']);
      return;
    }

    this.projectService
      .get(id)
      .pipe(take(1))
      .subscribe({
        next: p =>
          this.project.set({
            id: p.id ?? id,
            name: p.name ?? '',
            description: p.description ?? '',
            pipelines: [],
          }),
        error: () => this.router.navigate(['/404']),
      });
  }

  openCreatePipelineModal(projectId: string) {
    this.router.navigate(
      [{ outlets: { modal: ['projects', projectId, 'pipelines', 'new'] } }],
      { relativeTo: this.route.root },
    );
  }

}

