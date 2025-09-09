using System;
using Nomium.MergeSensei.Groups.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Groups;

public interface IGroupAppService : ICrudAppService<GroupDto, Guid>; 