using System;
using Nomium.MergeSensei.Branches.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Branches;

public interface IBranchAppService : ICrudAppService<BranchDto, Guid>;