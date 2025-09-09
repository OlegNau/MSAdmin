import type { EntityDto } from '@abp/ng.core';

export interface BranchDto extends EntityDto<string> {
  name?: string;
  lastCommitSha?: string;
  isDefault: boolean;
  repositoryId?: string;
}
