import type { EntityDto } from '@abp/ng.core';

export interface TriggerDto extends EntityDto<string> {
  branchId?: string;
  repositoryId?: string;
  typeId: number;
}
