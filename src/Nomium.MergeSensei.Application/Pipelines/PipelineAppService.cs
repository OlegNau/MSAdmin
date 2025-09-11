using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Pipelines.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Nomium.MergeSensei.Pipelines;

[Authorize]
public class PipelineAppService : CrudAppService<Pipeline, PipelineDto, Guid,
    PagedAndSortedResultRequestDto, PipelineCreateDto, PipelineUpdateDto>, IPipelineAppService
{
    private readonly IRepository<Repository, Guid> _repositoryRepo;
    private readonly IRepository<Branch, Guid> _branchRepo;
    private readonly IRepository<AiModel, long> _aiModelRepo;
    private readonly IRepository<TriggerType, long> _triggerTypeRepo;

    public PipelineAppService(
        IPipelineRepository repository,
        IRepository<Repository, Guid> repositoryRepo,
        IRepository<Branch, Guid> branchRepo,
        IRepository<AiModel, long> aiModelRepo,
        IRepository<TriggerType, long> triggerTypeRepo)
        : base(repository)
    {
        _repositoryRepo = repositoryRepo;
        _branchRepo = branchRepo;
        _aiModelRepo = aiModelRepo;
        _triggerTypeRepo = triggerTypeRepo;
    }

    public override async Task<PipelineDto> CreateAsync(PipelineCreateDto input)
    {
        var repo = await _repositoryRepo.GetAsync(input.RepositoryId);
        if (repo.ProjectId != input.ProjectId)
            throw new UserFriendlyException("Repository does not belong to the project");

        var branch = await _branchRepo.GetAsync(input.BranchId);
        if (branch.RepositoryId != input.RepositoryId)
            throw new UserFriendlyException("Branch does not belong to the repository");

        await _triggerTypeRepo.GetAsync(input.TriggerTypeId);

        if (input.AgentIds == null || input.AgentIds.Length == 0)
            throw new UserFriendlyException("At least one AI agent must be selected");

        foreach (var mid in input.AgentIds.Distinct())
            await _aiModelRepo.GetAsync(mid);

        var entity = new Pipeline(
            GuidGenerator.Create(),
            input.ProjectId,
            input.Name,
            input.IsActive,
            input.RepositoryId,
            input.BranchId,
            input.TriggerTypeId
        );

        entity.SetAgents(input.AgentIds);

        await Repository.InsertAsync(entity, autoSave: true);

        return MapToGetOutputDto(entity);
    }
}
