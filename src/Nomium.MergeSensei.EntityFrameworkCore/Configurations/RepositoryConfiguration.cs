using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Nomium.MergeSensei.Configurations;

public class RepositoryConfiguration : IEntityTypeConfiguration<Repository>
{
    public void Configure(EntityTypeBuilder<Repository> builder)
    {
        builder.ToTable("Repositories");
        builder.ConfigureByConvention();
        builder.ConfigureExtraProperties();

        builder.HasKey(r => r.Id);

        builder.Property(r => r.Name)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.EntityName.MaxLength);

        builder.Property(r => r.Url)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.Url.MaxLength);

        builder.Property(r => r.WebhookUrl)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.Url.MaxLength);
        
        builder.HasOne<Project>()
            .WithMany()
            .HasForeignKey(r => r.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(r => r.WebhookUrl)
            .IsUnique();
    }
}
