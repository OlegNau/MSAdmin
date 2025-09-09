using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Nomium.MergeSensei.Entities;

public class Trigger : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid BranchId { get; set; }
    public Guid RepositoryId { get; set; }
    public long TypeId { get; set; }
    public Guid? TenantId { get; set; }
}