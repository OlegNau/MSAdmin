using System;
using Microsoft.AspNetCore.Authorization;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Nodes.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.Nodes;

[Authorize]
public class NodeAppService(INodeRepository repository)
    : CrudAppService<Node, NodeDto, Guid>(repository), INodeAppService; 