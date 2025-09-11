using AutoMapper;
using Nomium.MergeSensei.Pipelines.Dtos;

namespace Nomium.MergeSensei.Pipelines;

public class PipelineApplicationAutoMapperProfile : Profile
{
    public PipelineApplicationAutoMapperProfile()
    {
        CreateMap<Pipeline, PipelineDto>();
    }
}
