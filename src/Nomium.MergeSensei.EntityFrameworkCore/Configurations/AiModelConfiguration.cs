using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;

namespace Nomium.MergeSensei.Configurations;

public class AiModelConfiguration : IEntityTypeConfiguration<Entities.AiModel>
{
    public void Configure(EntityTypeBuilder<Entities.AiModel> builder)
    {
        builder.ToTable("AiModels");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Name)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.EntityName.MaxLength);

        builder.Property(m => m.Vendor)
            .HasMaxLength(EntityConstraintConsts.Vendor.MaxLength);

        builder.HasIndex(m => m.Name).IsUnique();
    }
}
