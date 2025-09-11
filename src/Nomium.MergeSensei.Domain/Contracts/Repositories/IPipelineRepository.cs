using System;
using Nomium.MergeSensei.Pipelines;
using Volo.Abp.Domain.Repositories;

namespace Nomium.MergeSensei.Contracts.Repositories;

public interface IPipelineRepository : IRepository<Pipeline, Guid>; 