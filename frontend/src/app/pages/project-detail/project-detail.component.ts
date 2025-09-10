import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { take, map, finalize } from 'rxjs';

import { ProjectService } from '../../proxy/projects/project.service';
import { RepositoryService } from '../../proxy/repositories/repository.service';
import { BranchService } from '../../proxy/branches/branch.service';
import { PipelineService } from '../../proxy/pipelines/pipeline.service';

import type {
  ProjectDetailView,
  RepositoryRow,
  CreateRepositoryForm,
  CreateBranchForm,
  PipelineRow,
  VcsProvider,
} from './models/project-detail.model';

import { ToastService } from '../../core/toast/toast.service';
import { LocalizationPipe } from '@abp/ng.core';

function providerFromUrl(url: string): VcsProvider | undefined {
  if (!url) return undefined;
  if (url.includes('github.com')) return 'GitHub';
  if (url.includes('gitlab.com')) return 'GitLab';
  if (url.includes('bitbucket.org')) return 'Bitbucket';
  return undefined;
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ReactiveFormsModule, LocalizationPipe],
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
  private readonly pipelineService = inject(PipelineService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  public readonly project = signal<ProjectDetailView>({ id: '', name: '', description: '' });

  public readonly loadingRepos = signal<boolean>(true);
  public readonly repositories = signal<RepositoryRow[]>([]);
  public readonly showRepoForm = signal<boolean>(false);
  public readonly selectedRepoIdForBranch = signal<string | null>(null);
  public readonly repoSubmitting = signal<boolean>(false);
  public readonly repoToggling = signal<Record<string, boolean>>({});
  public readonly branchSubmitting = signal<boolean>(false);

  public readonly repoForm = this.fb.nonnullable.group<CreateRepositoryForm>(
    {
      provider: 'https://github.com/',
      repoPath: '',
      name: '',
      webhookUrl: '',
      isActive: true,
    },
    {
      validators: [],
    },
  );
  this.repoForm.get('name')!.addValidators([Validators.required]);
  this.repoForm.get('repoPath')!.addValidators([Validators.required]);

  public readonly branchForm = this.fb.nonnullable.group<CreateBranchForm>({
    name: '',
    isDefault: true,
  });
  this.branchForm.get('name')!.addValidators([Validators.required]);

  public readonly loadingPipelines = signal<boolean>(true);
  public readonly pipelines = signal<PipelineRow[]>([]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!id) {
      this.router.navigate(['/404']);
      return;
    }

    this.projectService.get(id).pipe(take(1)).subscribe({
      next: p => {
        this.project.set({
          id: p.id ?? id,
          name: p.name ?? '',
          description: p.description ?? '',
        });
        this.loadRepositories();
        this.loadPipelines();
      },
      error: () => this.router.navigate(['/404']),
    });
  }

  openCreatePipelineModal(projectId: string): void {
    this.router.navigate(
      [{ outlets: { modal: ['projects', projectId, 'pipelines', 'new'] } }],
      { relativeTo: this.route.root },
    );
  }

  toggleRepoForm(): void {
    this.showRepoForm.update(v => !v);
    this.repoForm.reset({ provider: 'https://github.com/', repoPath: '', name: '', webhookUrl: '', isActive: true });
  }

  private loadRepositories(): void {
    this.loadingRepos.set(true);
    this.repositoryService
      .getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        map(res => (res.items ?? []).filter(r => r.projectId === this.project().id)),
        map(items =>
          items.map<RepositoryRow>(r => ({
            id: r.id!,
            name: r.name ?? '',
            url: r.url ?? '',
            isActive: !!r.isActive,
            projectId: r.projectId!,
            provider: providerFromUrl(r.url ?? ''),
          })),
        ),
        take(1),
        finalize(() => this.loadingRepos.set(false)),
      )
      .subscribe({
        next: rows => this.repositories.set(rows),
        error: () => {
          this.toast.error({ message: 'Failed to load repositories' }); // TODO(i18n)
          this.repositories.set([]);
        },
      });
  }

  addRepository(): void {
    if (this.repoForm.invalid) {
      this.repoForm.markAllAsTouched();
      return;
    }
    this.repoSubmitting.set(true);

    const { provider, repoPath, name, webhookUrl, isActive } = this.repoForm.value;
    const url = `${provider}${repoPath}`.trim();

    this.repositoryService
      .create({
        name: name!,
        url,
        webhookUrl: webhookUrl || undefined,
        isActive: isActive ?? true,
        projectId: this.project().id,
      })
      .pipe(finalize(() => this.repoSubmitting.set(false)), take(1))
      .subscribe({
        next: repo => {
          this.repositories.update(list => [
            ...list,
            {
              id: repo.id!,
              name: repo.name ?? '',
              url: repo.url ?? '',
              isActive: !!repo.isActive,
              projectId: repo.projectId!,
              provider: providerFromUrl(repo.url ?? ''),
            },
          ]);
          this.showRepoForm.set(false);
          this.repoForm.reset({
            provider: 'https://github.com/',
            repoPath: '',
            name: '',
            webhookUrl: '',
            isActive: true,
          });
          this.toast.success({ message: 'Repository added' }); // TODO(i18n)
        },
        error: () => this.toast.error({ message: 'Failed to add repository' }), // TODO(i18n)
      });
  }

  toggleActive(repo: RepositoryRow, checked: boolean): void {
    this.repoToggling.update(m => ({ ...m, [repo.id]: true }));
    this.repositoryService
      .toggleActiveByIdAndInput(repo.id, { isActive: checked })
      .pipe(finalize(() => this.repoToggling.update(m => ({ ...m, [repo.id]: false }))), take(1))
      .subscribe({
        next: () => {
          this.repositories.update(list => list.map(r => (r.id === repo.id ? { ...r, isActive: checked } : r)));
          this.toast.success({ message: 'Repository updated' }); // TODO(i18n)
        },
        error: () => this.toast.error({ message: 'Failed to update repository' }), // TODO(i18n)
      });
  }

  openBranchForm(repoId: string): void {
    this.selectedRepoIdForBranch.set(repoId);
    this.branchForm.reset({ name: '', isDefault: true });
  }

  addBranch(repoId: string): void {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    this.branchSubmitting.set(true);
    const { name, isDefault } = this.branchForm.value;

    this.branchService
      .create({ name: name!, isDefault: !!isDefault, repositoryId: repoId })
      .pipe(finalize(() => this.branchSubmitting.set(false)), take(1))
      .subscribe({
        next: () => {
          this.selectedRepoIdForBranch.set(null);
          this.toast.success({ message: 'Branch added' }); // TODO(i18n)
        },
        error: () => this.toast.error({ message: 'Failed to add branch' }), // TODO(i18n)
      });
  }

  private loadPipelines(): void {
    this.loadingPipelines.set(true);
    this.pipelineService
      .getList({ skipCount: 0, maxResultCount: 1000 /* TODO(api): filter by project if available */ })
      .pipe(
        map(res =>
          (res.items ?? []).map<PipelineRow>(p => ({
            id: p.id!,
            name: (p as any).name ?? p.id!.slice(0, 8),
            status: ((p as any).status as any) ?? 'Inactive',
            lastRun: p.startedAt ? String(p.startedAt) : '',
          })),
        ),
        take(1),
        finalize(() => this.loadingPipelines.set(false)),
      )
      .subscribe({
        next: rows => this.pipelines.set(rows),
        error: () => {
          this.toast.error({ message: 'Failed to load pipelines' }); // TODO(i18n)
          this.pipelines.set([]);
        },
      });
  }
}
