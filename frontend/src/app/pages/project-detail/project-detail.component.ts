import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../proxy/projects/project.service';
import { RepositoryService } from '../../proxy/repositories/repository.service';
import { BranchService } from '../../proxy/branches/branch.service';
import type { RepositoryDto } from '../../proxy/repositories/dtos/models';
import { take, map } from 'rxjs';

type Status = 'Active' | 'Inactive';
type PipelineRow = { id: string; name: string; status: Status; lastRun: string };

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ReactiveFormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly repositoryService = inject(RepositoryService);
  private readonly branchService = inject(BranchService);
  private readonly fb = inject(FormBuilder);

  public readonly project = signal<{
    id: string;
    name: string;
    description: string;
    pipelines: PipelineRow[];
  }>({ id: '', name: '', description: '', pipelines: [] });

  public readonly repositories = signal<RepositoryDto[]>([]);

  public readonly showRepoForm = signal(false);
  public readonly repoForm = this.fb.group({
    provider: ['https://github.com/'], // UI-only, not part of RepositoryDto
    name: ['', Validators.required],
    repoPath: ['', Validators.required], // UI-only, not part of RepositoryDto
    webhookUrl: [''],
    isActive: [true],
  });

  public readonly branchForm = this.fb.group({
    name: ['', Validators.required],
    isDefault: [true],
  });
  public readonly branchRepoId = signal<string | null>(null);

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
        next: p => {
          this.project.set({
            id: p.id ?? id,
            name: p.name ?? '',
            description: p.description ?? '',
            pipelines: [],
          });
          this.loadRepositories();
        },
        error: () => this.router.navigate(['/404']),
      });
  }

  openCreatePipelineModal(projectId: string) {
    this.router.navigate(
      [{ outlets: { modal: ['projects', projectId, 'pipelines', 'new'] } }],
      { relativeTo: this.route.root },
    );
  }

  private loadRepositories(): void {
    // TODO(api): endpoint to get repositories by project
    this.repositoryService
      .getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        map(res => res.items?.filter(r => r.projectId === this.project().id) ?? []),
        take(1),
      )
      .subscribe(list => this.repositories.set(list));
  }

  toggleRepoForm(): void {
    this.showRepoForm.update(v => !v);
    this.repoForm.reset({ provider: 'https://github.com/', isActive: true });
  }

  addRepository(): void {
    if (this.repoForm.invalid) {
      this.repoForm.markAllAsTouched();
      return;
    }

    const { provider, repoPath, name, webhookUrl, isActive } = this.repoForm.value;
    const url = `${provider ?? ''}${repoPath ?? ''}`;

    this.repositoryService
      .create({
        name: name ?? '',
        url,
        webhookUrl: webhookUrl ?? undefined,
        isActive: isActive ?? true,
        projectId: this.project().id,
      })
      .pipe(take(1))
      .subscribe(repo => {
        this.repositories.update(list => [...list, repo]);
        this.toggleRepoForm();
      });
  }

  toggleActive(repo: RepositoryDto, isActive: boolean): void {
    this.repositoryService
      .toggleActiveByIdAndInput(repo.id!, { isActive })
      .pipe(take(1))
      .subscribe(() =>
        this.repositories.update(list =>
          list.map(r => (r.id === repo.id ? { ...r, isActive } : r)),
        ),
      );
  }

  openBranchForm(repoId: string): void {
    this.branchRepoId.set(repoId);
    this.branchForm.reset({ name: '', isDefault: true });
  }

  addBranch(repoId: string): void {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }

    this.branchService
      .create({
        name: this.branchForm.value.name ?? '',
        isDefault: this.branchForm.value.isDefault ?? true,
        repositoryId: repoId,
      })
      .pipe(take(1))
      .subscribe(() => {
        this.branchRepoId.set(null);
      });
  }
}

