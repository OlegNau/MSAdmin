using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Nomium.MergeSensei.Entities;

public class Pipeline : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public string Status { get; set; }
    public DateTime StartedAt { get; private set; }
    public DateTime? FinishedAt { get; set; }
    public int? Duration { get; set; }
    public Guid? TenantId { get; set; }

    public Pipeline(Guid id, DateTime startedAt, string status)
        : base(id)
    {
        StartedAt = startedAt;
        SetStatus(status);
    }

    public void SetStatus(string status)
    {
        Status = Check.Length(
            status,
            nameof(status),
            maxLength: EntityConstraintConsts.Status.MaxLength
        );
    }
}