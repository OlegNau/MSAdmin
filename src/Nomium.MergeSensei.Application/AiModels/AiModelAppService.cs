using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.AiModels.Dtos;
using Nomium.MergeSensei.Contracts.Repositories;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.AiModels;

[Authorize]
public class AiModelAppService(IAiModelRepository repository)
    : CrudAppService<Entities.AiModel, AiModelDto, long>(repository), IAiModelAppService;