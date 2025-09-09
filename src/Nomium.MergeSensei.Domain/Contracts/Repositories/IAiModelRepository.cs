using Volo.Abp.Domain.Repositories;

namespace Nomium.MergeSensei.Contracts.Repositories;

public interface IAiModelRepository : IRepository<Entities.AiModel, long>;