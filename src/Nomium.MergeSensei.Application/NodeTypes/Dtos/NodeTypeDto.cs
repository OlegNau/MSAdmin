using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.NodeTypes.Dtos;

public class NodeTypeDto : EntityDto<long>
{
    public string Name { get; set; }
    public Guid? ModelId { get; set; }
} 