using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Repositories.Dtos;

namespace Nomium.MergeSensei.Repositories;

public class RepositoryMapper : Profile
{
    public RepositoryMapper()
    {
        CreateMap<Repository, RepositoryDto>();
        CreateMap<RepositoryDto, Repository>();
    }
} 