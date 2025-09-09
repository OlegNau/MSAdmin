using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using N8n.PublicApi;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Managers;
using Nomium.MergeSensei.Repositories.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Repositories;

[Authorize]
public class RepositoryAppService(
    RepositoryDomainService repositoryDomainService,
    IRepositoryRepository repository,
    IWorkflowApi workflowApi)
    : CrudAppService<Repository, RepositoryDto, Guid>(repository), IRepositoryAppService
{
    [HttpPut("/api/app/repository/{id:guid}/active")]
    public async Task ToggleActive(Guid id, ToggleActiveDto input)
    {
        var repo = await Repository.GetAsync(id);

        repositoryDomainService.ChangeIsActive(repo, input.IsActive);

        await Repository.UpdateAsync(repo);

        // var test = await workflowApi.WorkflowsGET();
    }
}