using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Triggers.Dtos;

namespace Nomium.MergeSensei.Triggers;

public class TriggerMapper : Profile
{
    public TriggerMapper()
    {
        CreateMap<Trigger, TriggerDto>();
        CreateMap<TriggerDto, Trigger>();
    }
} 