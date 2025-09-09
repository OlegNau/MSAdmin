using System;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Nomium.MergeSensei.Repositories;

public class NodeRepository(IDbContextProvider<MergeSenseiDbContext> dbContextProvider)
    : EfCoreRepository<MergeSenseiDbContext, Node, Guid>(dbContextProvider), INodeRepository; 