using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities;

namespace Nomium.MergeSensei.Entities;

public class NodeType : Entity<long>
{
    public string Name { get; private set; } 

    public Guid? ModelId { get; set; }

    public NodeType(long id, string name)
        : base(id)
    {
        Name = Check.NotNullOrWhiteSpace(
            name,
            nameof(name),
            maxLength: EntityConstraintConsts.Node.NameMaxLength
        );
    }
}