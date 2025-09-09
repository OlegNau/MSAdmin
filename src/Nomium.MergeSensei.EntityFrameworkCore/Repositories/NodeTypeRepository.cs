using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Nomium.MergeSensei.Repositories;

public class NodeTypeRepository(IDbContextProvider<MergeSenseiDbContext> dbContextProvider)
    : EfCoreRepository<MergeSenseiDbContext, NodeType, long>(dbContextProvider), INodeTypeRepository; 