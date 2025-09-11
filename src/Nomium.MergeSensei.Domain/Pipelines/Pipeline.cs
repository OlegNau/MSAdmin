using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Nomium.MergeSensei.Pipelines;

public class Pipeline : AuditedAggregateRoot<Guid>
{
    public Guid ProjectId { get; protected set; }
    public string Name { get; protected set; }
    public bool IsActive { get; protected set; }

    public Guid RepositoryId { get; protected set; }
    public Guid BranchId { get; protected set; }
    public long TriggerTypeId { get; protected set; }

    public ICollection<PipelineAgent> Agents { get; protected set; }

    protected Pipeline() { }

    public Pipeline(Guid id, Guid projectId, string name, bool isActive,
                    Guid repositoryId, Guid branchId, long triggerTypeId) : base(id)
    {
        ProjectId = projectId;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        IsActive = isActive;
        RepositoryId = repositoryId;
        BranchId = branchId;
        TriggerTypeId = triggerTypeId;
        Agents = new List<PipelineAgent>();
    }

    public void SetAgents(IEnumerable<long> aiModelIds)
    {
        Agents.Clear();
        foreach (var mid in aiModelIds)
            Agents.Add(new PipelineAgent(Id, mid));
    }
}
