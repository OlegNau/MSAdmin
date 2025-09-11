using System;
using Nomium.MergeSensei.Repositories.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Repositories;

public interface IRepositoryAppService :
    ICrudAppService<RepositoryDto, Guid, PagedAndSortedResultRequestDto, RepositoryDto, RepositoryDto>;