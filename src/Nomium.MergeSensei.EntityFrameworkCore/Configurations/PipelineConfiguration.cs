using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Nomium.MergeSensei.Configurations;

public class PipelineConfiguration : IEntityTypeConfiguration<Pipeline>
{
    public void Configure(EntityTypeBuilder<Pipeline> builder)
    {
        builder.ToTable("Pipelines");
        builder.ConfigureByConvention();
        builder.ConfigureExtraProperties();

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Status)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.Status.MaxLength);
    }
}
