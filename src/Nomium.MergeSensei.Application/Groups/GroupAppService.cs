using System;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Groups.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Groups;

[Authorize]
public class GroupAppService(IGroupRepository repository)
    : CrudAppService<Group, GroupDto, Guid>(repository), IGroupAppService; 