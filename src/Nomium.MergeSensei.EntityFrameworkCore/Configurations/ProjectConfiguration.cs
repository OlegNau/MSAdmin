using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Nomium.MergeSensei.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.ToTable("Projects");
        builder.ConfigureByConvention();
        builder.ConfigureExtraProperties();

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.EntityName.MaxLength);

        builder.Property(p => p.Description)
            .HasMaxLength(EntityConstraintConsts.Description.MaxLength);

        builder.Property(p => p.GitAccessToken)
            .HasMaxLength(EntityConstraintConsts.GitAccessToken.MaxLength);
    }
}
