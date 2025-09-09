using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Nomium.MergeSensei.Entities;

public class Group : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public string Name { get; private set; }
    public string Description { get; set; }
    public Guid? TenantId { get; set; }


    public Group(Guid id, string name)
        : base(id)
    {
        Name = Check.NotNullOrWhiteSpace(
            name,
            nameof(name),
            minLength: EntityConstraintConsts.EntityName.MinLength,
            maxLength: EntityConstraintConsts.EntityName.MaxLength
        );
    }
}