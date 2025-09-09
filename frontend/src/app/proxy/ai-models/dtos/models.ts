import type { EntityDto } from '@abp/ng.core';

export interface AiModelDto extends EntityDto<number> {
  name?: string;
  vendor?: string;
}
