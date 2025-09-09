import type { EntityDto } from '@abp/ng.core';

export interface TriggerTypeDto extends EntityDto<number> {
  name?: string;
}
