export interface PipelineDraft {
  projectId: string;
  name: string;
  agentIds: number[];
  triggerTypeId: number | null;
  repositoryId: string | null;
  branchId: string | null;
}

export interface AgentRow { id: number; name: string; provider?: string; modelName?: string; checked: boolean; }
export interface TriggerTypeRow { id: number; name: string; }
export interface RepositoryLite { id: string; name: string; url: string; isActive: boolean; }
export interface BranchRow { id: string; name: string; isDefault: boolean; repositoryId: string; }
