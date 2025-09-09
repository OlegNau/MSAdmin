using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.NodeTypes.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.NodeTypes;

[Authorize]
public class NodeTypeAppService(INodeTypeRepository repository)
    : CrudAppService<NodeType, NodeTypeDto, long>(repository), INodeTypeAppService; 