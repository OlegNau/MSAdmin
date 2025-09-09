import type { EntityDto } from '@abp/ng.core';

export interface NodeTypeDto extends EntityDto<number> {
  name?: string;
  modelId?: string;
}
