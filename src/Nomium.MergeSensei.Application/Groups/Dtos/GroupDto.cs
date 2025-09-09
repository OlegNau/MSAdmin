using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Groups.Dtos;

public class GroupDto : EntityDto<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
} 