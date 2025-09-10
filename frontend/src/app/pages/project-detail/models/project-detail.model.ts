export type Status = 'Active' | 'Inactive';

export interface PipelineRow {
  id: string;
  name: string;
  status: Status;
  lastRun: string;
}

export interface ProjectDetailView {
  id: string;
  name: string;
  description: string;
  pipelines: PipelineRow[];
}
