using System;
using Nomium.MergeSensei.Nodes.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Nodes;

public interface INodeAppService : ICrudAppService<NodeDto, Guid>; 