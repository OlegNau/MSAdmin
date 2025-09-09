using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Pipelines.Dtos;

namespace Nomium.MergeSensei.Pipelines;

public class PipelineMapper : Profile
{
    public PipelineMapper()
    {
        CreateMap<Pipeline, PipelineDto>();
        CreateMap<PipelineDto, Pipeline>();
    }
} 