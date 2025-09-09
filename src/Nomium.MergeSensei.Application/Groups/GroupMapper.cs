using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Groups.Dtos;

namespace Nomium.MergeSensei.Groups;

public class GroupMapper : Profile
{
    public GroupMapper()
    {
        CreateMap<Group, GroupDto>();
        CreateMap<GroupDto, Group>();
    }
} 