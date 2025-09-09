import type { EntityDto } from '@abp/ng.core';

export interface PipelineDto extends EntityDto<string> {
  status?: string;
  startedAt?: string;
  finishedAt?: string;
  duration?: number;
}
