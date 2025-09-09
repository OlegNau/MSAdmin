import type { EntityDto } from '@abp/ng.core';

export interface NodeDto extends EntityDto<string> {
  typeId: number;
}
