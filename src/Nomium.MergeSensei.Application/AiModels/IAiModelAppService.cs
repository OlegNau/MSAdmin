using Nomium.MergeSensei.AiModels.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.AiModels;

public interface IAiModelAppService : ICrudAppService<AiModelDto, long>;