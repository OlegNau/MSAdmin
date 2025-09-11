import { ChangeDetectionStrategy, Component, HostListener, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize, take, map } from 'rxjs';
import { ToastService } from '@/app/core/toast/toast.service';
import { PipelinesBusService } from '@/app/core/bus/pipelines-bus.service';

import { AiModelService } from '@/app/proxy/ai-models/ai-model.service';
import { TriggerTypeService } from '@/app/proxy/trigger-types/trigger-type.service';
import { RepositoryService } from '@/app/proxy/repositories/repository.service';
import { BranchService } from '@/app/proxy/branches/branch.service';
import { PipelineService } from '@/app/proxy/pipelines/pipeline.service';

import type { PipelineDraft, AgentRow, TriggerTypeRow, RepositoryLite, BranchRow } from './models/create-pipeline.model';

@Component({
  selector: 'app-pipeline-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pipeline-create-modal.component.html',
  styleUrls: ['./pipeline-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineCreateModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly bus = inject(PipelinesBusService);

  private readonly ai = inject(AiModelService);
  private readonly triggers = inject(TriggerTypeService);
  private readonly repos = inject(RepositoryService);
  private readonly branches = inject(BranchService);
  private readonly pipelines = inject(PipelineService);

  public readonly loadingAgents = signal(true);
  public readonly loadingRepos = signal(true);
  public readonly loadingBranches = signal(false);
  public readonly loadingTriggers = signal(true);
  public readonly saving = signal(false);

  public readonly agents = signal<AgentRow[]>([]);
  public readonly triggerTypes = signal<TriggerTypeRow[]>([]);
  public readonly repositories = signal<RepositoryLite[]>([]);
  public readonly repoBranches = signal<BranchRow[]>([]);

  public readonly draft = signal<PipelineDraft>({
    projectId: '',
    name: '',
    agentIds: [],
    triggerTypeId: null,
    repositoryId: null,
    branchId: null,
  });

  public readonly formInfo = this.fb.group({ name: ['', Validators.required] });

  public step = 1;
  @HostListener('document:keydown.escape') onEsc() { this.closeModal(); }

  public readonly syncAgents = effect(() => {
    const ids = new Set(this.draft().agentIds);
    this.agents.update(list => list.map(a => ({ ...a, checked: ids.has(a.id) })));
  });

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId') ?? this.route.snapshot.paramMap.get('id') ?? '';
    if (!projectId) {
      this.toast.error({ message: 'Project id is missing' });
      this.closeModal();
      return;
    }
    this.draft.update(d => ({ ...d, projectId }));

    this.loadAgents();
    this.loadTriggerTypes();
    this.loadRepositories(projectId);
  }

  private loadAgents(): void {
    this.loadingAgents.set(true);
    this.ai.getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        take(1),
        map(res => (res.items ?? []).map(m => ({
          id: m.id!,
          name: m.name ?? m.id!.toString(),
          provider: (m as any).provider,
          modelName: (m as any).modelName,
          checked: false,
        }))),
        finalize(() => this.loadingAgents.set(false)),
      )
      .subscribe({
        next: rows => this.agents.set(rows),
        error: () => this.toast.error({ message: 'Failed to load AI models' }),
      });
  }

  private loadTriggerTypes(): void {
    this.loadingTriggers.set(true);
    this.triggers.getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        take(1),
        map(res => (res.items ?? []).map(t => ({ id: t.id!, name: (t as any).name ?? t.id!.toString() }))),
        finalize(() => this.loadingTriggers.set(false)),
      )
      .subscribe({
        next: rows => this.triggerTypes.set(rows),
        error: () => this.toast.error({ message: 'Failed to load trigger types' }),
      });
  }

  private loadRepositories(projectId: string): void {
    this.loadingRepos.set(true);
    this.repos.getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        take(1),
        map(res => (res.items ?? []).filter(r => r.projectId === projectId)),
        map(items => items.map<RepositoryLite>(r => ({ id: r.id!, name: r.name ?? '', url: r.url ?? '', isActive: !!r.isActive }))),
        finalize(() => this.loadingRepos.set(false)),
      )
      .subscribe({
        next: rows => {
          this.repositories.set(rows);
          const active = rows.find(r => r.isActive) ?? rows[0];
          if (active) this.onRepositoryChange(active.id);
        },
        error: () => this.toast.error({ message: 'Failed to load repositories' }),
      });
  }

  public onRepositoryChange(repoId: string): void {
    this.draft.update(d => ({ ...d, repositoryId: repoId, branchId: null }));
    this.loadingBranches.set(true);
    this.branches.getList({ skipCount: 0, maxResultCount: 1000 })
      .pipe(
        take(1),
        map(res => (res.items ?? []).filter(b => b.repositoryId === repoId)),
        map(items => items.map<BranchRow>(b => ({ id: b.id!, name: b.name ?? '', isDefault: !!b.isDefault, repositoryId: b.repositoryId! }))),
        finalize(() => this.loadingBranches.set(false)),
      )
      .subscribe({
        next: rows => {
          this.repoBranches.set(rows);
          const def = rows.find(b => b.isDefault) ?? rows[0] ?? null;
          if (def) this.draft.update(d => ({ ...d, branchId: def.id }));
        },
        error: () => this.toast.error({ message: 'Failed to load branches' }),
      });
  }

  public prev(): void {
    this.step = Math.max(1, this.step - 1);
  }

  public next(): void {
    if (this.step === 1) {
      this.setNameFromForm();
      if (this.formInfo.invalid) return;
    }
    this.step = Math.min(4, this.step + 1);
  }

  public setNameFromForm(): void {
    if (this.formInfo.invalid) {
      this.formInfo.markAllAsTouched();
      return;
    }
    const name = this.formInfo.value.name?.trim() ?? '';
    this.draft.update(d => ({ ...d, name }));
  }

  public toggleAgent(agentId: number, checked: boolean): void {
    this.draft.update(d => {
      const set = new Set(d.agentIds);
      checked ? set.add(agentId) : set.delete(agentId);
      return { ...d, agentIds: Array.from(set) };
    });
  }

  public setTriggerType(triggerTypeId: number): void {
    this.draft.update(d => ({ ...d, triggerTypeId }));
  }

  public setBranch(branchId: string): void {
    this.draft.update(d => ({ ...d, branchId }));
  }

  private buildPayload() {
    const d = this.draft();
    const payload: any = {
      projectId: d.projectId,
      name: d.name,
      isActive: true,
      agentIds: d.agentIds,
      triggerTypeId: d.triggerTypeId,
      repositoryId: d.repositoryId,
      branchId: d.branchId,
    };
    Object.keys(payload).forEach(k => (payload[k] === null || payload[k] === undefined) && delete payload[k]);
    return payload;
  }

  public canSave = computed(() => {
    const d = this.draft();
    return !!d.projectId && !!d.name?.trim() && d.agentIds.length > 0 && !!d.triggerTypeId && !!d.repositoryId && !!d.branchId && !this.saving();
  });

  public saveAndActivate(): void {
    if (!this.canSave()) {
      this.toast.error({ message: 'Fill in all required fields' });
      return;
    }
    const payload = this.buildPayload();
    this.saving.set(true);
    this.pipelines.create(payload)
      .pipe(finalize(() => this.saving.set(false)), take(1))
      .subscribe({
        next: () => {
          this.toast.success({ message: 'Pipeline created and activated' });
          this.bus.notifyCreated();
          this.closeModal();
        },
        error: (e) => {
          this.toast.error({ message: 'Failed to create pipeline' });
          console.error(e);
        },
      });
  }

  public closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
