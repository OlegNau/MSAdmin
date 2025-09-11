using System;
using Nomium.MergeSensei.Pipelines.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Pipelines;

public interface IPipelineAppService : ICrudAppService<PipelineDto, Guid, PagedAndSortedResultRequestDto, PipelineCreateDto, PipelineUpdateDto>;