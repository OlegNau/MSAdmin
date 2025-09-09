using System;

namespace Nomium.MergeSensei.Entities;

public class PipelineTrigger
{
    public Guid PipelineId { get; set; }

    public Guid TriggerId { get; set; }
}