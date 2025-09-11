import { ChangeDetectionStrategy, Component, Input, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

export type VcsProvider = 'GitHub' | 'GitLab' | 'Bitbucket';

export interface ProjectListItem {
  id: string;
  name: string;
  description?: string;
  repositories: Array<{ id: string; name: string; url: string }>;
  pipelines: Array<{ id: string; name: string; lastRun?: string | null }>;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input({ required: true }) public project!: ProjectListItem;

  // локально, не выносить
  private providerFromUrl(url?: string): VcsProvider | undefined {
    if (!url) return undefined;
    if (url.includes('github.com')) return 'GitHub';
    if (url.includes('gitlab.com')) return 'GitLab';
    if (url.includes('bitbucket.org')) return 'Bitbucket';
    return undefined;
  }

  public readonly repoMeta = computed(() => {
    const repos = this.project?.repositories ?? [];
    return repos.map(r => ({
      ...r,
      provider: this.providerFromUrl(r.url),
    }));
  });
}
