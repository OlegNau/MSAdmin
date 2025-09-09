using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Nodes.Dtos;

public class NodeDto : EntityDto<Guid>
{
    public long TypeId { get; set; }
} 