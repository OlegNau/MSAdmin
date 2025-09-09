using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Branches.Dtos;

public class BranchDto : EntityDto<Guid>
{
    public string Name { get; set; }
    public string LastCommitSha { get; set; }
    public bool IsDefault { get; set; }
    public Guid RepositoryId { get; set; }
} 