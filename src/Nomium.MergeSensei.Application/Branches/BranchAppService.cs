using System;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Branches.Dtos;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Branches;

[Authorize]
public class BranchAppService(IBranchRepository repository)
    : CrudAppService<Branch, BranchDto, Guid>(repository), IBranchAppService; 