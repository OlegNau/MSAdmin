using System;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Pipelines.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Pipelines;

[Authorize]
public class PipelineAppService(IPipelineRepository repository)
    : CrudAppService<Pipeline, PipelineDto, Guid>(repository), IPipelineAppService; 