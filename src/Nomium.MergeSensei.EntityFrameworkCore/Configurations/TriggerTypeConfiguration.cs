using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;

namespace Nomium.MergeSensei.Configurations;

public class TriggerTypeConfiguration : IEntityTypeConfiguration<TriggerType>
{
    public void Configure(EntityTypeBuilder<TriggerType> builder)
    {
        builder.ToTable("TriggerTypes");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.Trigger.NameMaxLength);
    }
}
