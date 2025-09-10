export type VcsProvider = 'GitHub' | 'GitLab' | 'Bitbucket';

export interface RepositoryRow {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  projectId: string;
  // UI-only:
  provider?: VcsProvider;
}

export interface CreateRepositoryForm {
  provider: string;   // base URL: https://github.com/
  repoPath: string;   // UI-only: org/repo
  name: string;
  webhookUrl?: string;
  isActive: boolean;
}

export interface CreateBranchForm {
  name: string;
  isDefault: boolean;
}

export type Status = 'Active' | 'Inactive';

export interface PipelineRow {
  id: string;
  name: string;
  status: Status;
  lastRun: string;
}

export interface ProjectDetailView {
  id: string;
  name: string;
  description: string;
}
