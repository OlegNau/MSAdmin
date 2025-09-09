using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Triggers.Dtos;

public class TriggerDto : EntityDto<Guid>
{
    public Guid BranchId { get; set; }
    public Guid RepositoryId { get; set; }
    public long TypeId { get; set; }
} 