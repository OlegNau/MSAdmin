import { RepositoryDto } from '../../proxy/repositories/dtos';

export interface RepositoryWithMetadata extends RepositoryDto {
  platform: string;
  platformLogo: string;
  pipelineCount: number;
  lastPipelineRun?: Date | null;
}
