using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Pipelines.Dtos;

public class PipelineDto : EntityDto<Guid>
{
    public string Status { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public int? Duration { get; set; }
} 