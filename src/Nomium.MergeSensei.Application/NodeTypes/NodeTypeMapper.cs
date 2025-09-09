using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.NodeTypes.Dtos;

namespace Nomium.MergeSensei.NodeTypes;

public class NodeTypeMapper : Profile
{
    public NodeTypeMapper()
    {
        CreateMap<NodeType, NodeTypeDto>();
        CreateMap<NodeTypeDto, NodeType>();
    }
} 