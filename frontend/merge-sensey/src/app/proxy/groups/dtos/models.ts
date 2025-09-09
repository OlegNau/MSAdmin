import type { EntityDto } from '@abp/ng.core';

export interface GroupDto extends EntityDto<string> {
  name?: string;
  description?: string;
}
