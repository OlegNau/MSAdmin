using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Nomium.MergeSensei.Entities;

public class Repository : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public string Name { get; private set; }
    public string Url { get; set; }
    public string WebhookUrl { get; set; }
    public bool IsActive { get; set; }
    public Guid ProjectId { get; private set; }
    public Guid? TenantId { get; set; }

    public Repository(Guid id, string name, Guid projectId)
        : base(id)
    {
        Name = Check.NotNullOrWhiteSpace(
            name,
            nameof(name),
            minLength: EntityConstraintConsts.EntityName.MinLength,
            maxLength: EntityConstraintConsts.EntityName.MaxLength
        );
        ProjectId = projectId;
    }
}