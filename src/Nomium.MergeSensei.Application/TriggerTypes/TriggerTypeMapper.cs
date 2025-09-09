using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.TriggerTypes.Dtos;

namespace Nomium.MergeSensei.TriggerTypes;

public class TriggerTypeMapper : Profile
{
    public TriggerTypeMapper()
    {
        CreateMap<TriggerType, TriggerTypeDto>();
        CreateMap<TriggerTypeDto, TriggerType>();
    }
} 