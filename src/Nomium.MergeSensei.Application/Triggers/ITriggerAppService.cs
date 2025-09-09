using System;
using Nomium.MergeSensei.Triggers.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Triggers;

public interface ITriggerAppService : ICrudAppService<TriggerDto, Guid>; 