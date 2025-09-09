import type { EntityDto } from '@abp/ng.core';

export interface RepositoryDto extends EntityDto<string> {
  name?: string;
  url?: string;
  webhookUrl?: string;
  isActive: boolean;
  projectId?: string;
}

export interface ToggleActiveDto {
  isActive: boolean;
}
