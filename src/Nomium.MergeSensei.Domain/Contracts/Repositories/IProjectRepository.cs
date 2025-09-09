using System;
using Nomium.MergeSensei.Entities;
using Volo.Abp.Domain.Repositories;

namespace Nomium.MergeSensei.Contracts.Repositories;

public interface IProjectRepository : IRepository<Project, Guid>; 