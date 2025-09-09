using System;
using Nomium.MergeSensei.Projects.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Projects;

public interface IProjectAppService : ICrudAppService<ProjectDto, Guid>; 