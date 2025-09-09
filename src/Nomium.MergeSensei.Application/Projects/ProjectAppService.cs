using System;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Projects.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Projects;

[Authorize]
public class ProjectAppService(IProjectRepository repository)
    : CrudAppService<Project, ProjectDto, Guid>(repository), IProjectAppService; 