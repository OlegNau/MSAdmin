using System;

namespace Nomium.MergeSensei.Pipelines.Dtos;

public class PipelineCreateDto
{
    public Guid ProjectId { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; } = true;

    public long[] AgentIds { get; set; } = Array.Empty<long>();
    public long TriggerTypeId { get; set; }
    public Guid RepositoryId { get; set; }
    public Guid BranchId { get; set; }
}
