using AutoMapper;
using Nomium.MergeSensei.Branches.Dtos;
using Nomium.MergeSensei.Entities;

namespace Nomium.MergeSensei.Branches;

public class BranchMapper : Profile
{
    public BranchMapper()
    {
        CreateMap<Branch, BranchDto>();
        CreateMap<BranchDto, Branch>();
    }
} 