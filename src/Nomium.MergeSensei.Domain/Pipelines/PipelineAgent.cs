using System;
using Volo.Abp.Domain.Entities;

namespace Nomium.MergeSensei.Pipelines;

public class PipelineAgent : Entity
{
    public Guid PipelineId { get; protected set; }
    public long AiModelId { get; protected set; }

    protected PipelineAgent() { }

    public PipelineAgent(Guid pipelineId, long aiModelId)
    {
        PipelineId = pipelineId;
        AiModelId = aiModelId;
    }

    public override object[] GetKeys() => new object[] { PipelineId, AiModelId };
}
