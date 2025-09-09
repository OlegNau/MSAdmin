using AutoMapper;
using Nomium.MergeSensei.AiModels.Dtos;

namespace Nomium.MergeSensei.AiModels;

public class AiModelMapper : Profile
{
    public AiModelMapper()
    {
        CreateMap<Entities.AiModel, AiModelDto>();
        CreateMap<AiModelDto, Entities.AiModel>();
    }
}