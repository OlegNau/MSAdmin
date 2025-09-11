import type { EntityDto } from '@abp/ng.core';

export interface PipelineCreateDto {
  projectId?: string;
  name?: string;
  isActive?: boolean;
  agentIds?: number[];
  triggerTypeId?: number;
  repositoryId?: string;
  branchId?: string;
}

export interface PipelineUpdateDto {
  name?: string;
  isActive?: boolean;
}

export interface PipelineDto extends EntityDto<string> {
  projectId?: string;
  name?: string;
  isActive?: boolean;
  repositoryId?: string;
  branchId?: string;
  triggerTypeId?: number;
}
