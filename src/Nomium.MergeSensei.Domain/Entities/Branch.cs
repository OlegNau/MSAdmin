using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Nomium.MergeSensei.Entities;

public class Branch : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public string Name { get; private set; }
    public string LastCommitSha { get; set; }
    public bool IsDefault { get; set; }
    public Guid RepositoryId { get; private set; }
    public Guid? TenantId { get; set; }

    public Branch(Guid id, string name, Guid repositoryId)
        : base(id)
    {
        Name = Check.NotNullOrWhiteSpace(
            name,
            nameof(name),
            minLength: EntityConstraintConsts.EntityName.MinLength,
            maxLength: EntityConstraintConsts.EntityName.MaxLength
        );
        RepositoryId = repositoryId;
    }
}