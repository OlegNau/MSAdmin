using System;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Triggers.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Triggers;

[Authorize]
public class TriggerAppService(ITriggerRepository repository)
    : CrudAppService<Trigger, TriggerDto, Guid>(repository), ITriggerAppService; 