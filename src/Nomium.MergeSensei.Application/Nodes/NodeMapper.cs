using AutoMapper;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Nodes.Dtos;

namespace Nomium.MergeSensei.Nodes;

public class NodeMapper : Profile
{
    public NodeMapper()
    {
        CreateMap<Node, NodeDto>();
        CreateMap<NodeDto, Node>();
    }
} 