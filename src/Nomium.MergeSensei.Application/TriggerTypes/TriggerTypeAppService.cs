using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.TriggerTypes.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.TriggerTypes;

[Authorize]
public class TriggerTypeAppService(ITriggerTypeRepository repository)
    : CrudAppService<TriggerType, TriggerTypeDto, long>(repository), ITriggerTypeAppService; 