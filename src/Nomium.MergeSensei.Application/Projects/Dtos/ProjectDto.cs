using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Projects.Dtos;

public class ProjectDto : EntityDto<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string GitAccessToken { get; set; }
} 