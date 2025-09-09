using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Nomium.MergeSensei.Configurations;

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder.ToTable("Branches");
        builder.ConfigureByConvention();
        builder.ConfigureExtraProperties();

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Name)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.EntityName.MaxLength);

        builder.Property(b => b.LastCommitSha)
            .HasMaxLength(EntityConstraintConsts.Commit.ShaMaxLength);

        builder.HasOne<Repository>()
            .WithMany()
            .HasForeignKey(b => b.RepositoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}