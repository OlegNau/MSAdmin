using Nomium.MergeSensei.NodeTypes.Dtos;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei.NodeTypes;

public interface INodeTypeAppService : ICrudAppService<NodeTypeDto, long>; 