using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Repositories.Dtos;

namespace Nomium.MergeSensei.Repositories;

public class RepositoryApplicationAutoMapperProfile : Profile
{
    public RepositoryApplicationAutoMapperProfile()
    {
        CreateMap<Repository, RepositoryDto>();
    }
}
