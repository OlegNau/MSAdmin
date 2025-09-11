using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Repositories.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Nomium.MergeSensei.Repositories;

[Authorize]
public class RepositoryAppService :
    CrudAppService<Repository, RepositoryDto, Guid, PagedAndSortedResultRequestDto, RepositoryDto, RepositoryDto>,
    IRepositoryAppService
{
    public RepositoryAppService(IRepository<Repository, Guid> repository)
        : base(repository)
    {
    }

    [HttpPut("/api/app/repository/{id:guid}/active")]
    public async Task ToggleActive(Guid id, ToggleActiveDto input)
    {
        var repo = await Repository.GetAsync(id);
        repo.IsActive = input.IsActive;
        await Repository.UpdateAsync(repo);
    }
}
