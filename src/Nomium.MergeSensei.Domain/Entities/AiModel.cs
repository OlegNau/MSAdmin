using Volo.Abp;
using Volo.Abp.Domain.Entities;

namespace Nomium.MergeSensei.Entities;

public class AiModel : Entity<long>
{
    public string Name { get; set; }

    public string Vendor { get; set; }

    public AiModel(long id, string name, string vendor)
        : base(id)
    {
        Name = Check.NotNullOrWhiteSpace(
            name,
            nameof(name),
            minLength: EntityConstraintConsts.EntityName.MinLength,
            maxLength: EntityConstraintConsts.EntityName.MaxLength
        );

        Vendor = Check.Length(
            vendor,
            nameof(vendor),
            maxLength: EntityConstraintConsts.Vendor.MaxLength
        );
    }
}