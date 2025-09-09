using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Nomium.MergeSensei.Entities;

public class Node(Guid id, long typeId) : FullAuditedAggregateRoot<Guid>(id)
{
    public long TypeId { get; set; } = typeId;
}