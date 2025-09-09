using Volo.Abp;
using Volo.Abp.Domain.Entities;

namespace Nomium.MergeSensei.Entities;

public class TriggerType: Entity<long>
{
    public string Name { get; set; }

    public TriggerType(long id, string name)
        : base(id)
    {
        Name  = Check.NotNullOrWhiteSpace(
            name,
            nameof(name),
            maxLength: EntityConstraintConsts.Trigger.NameMaxLength
        );
    }
}