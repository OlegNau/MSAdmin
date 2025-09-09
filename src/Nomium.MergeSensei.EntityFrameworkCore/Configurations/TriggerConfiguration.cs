using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Nomium.MergeSensei.Configurations;

public class TriggerConfiguration : IEntityTypeConfiguration<Trigger>
{
    public void Configure(EntityTypeBuilder<Trigger> builder)
    {
        builder.ToTable("Triggers");
        builder.ConfigureByConvention();
        builder.ConfigureExtraProperties();

        builder.HasKey(t => t.Id);

        builder.HasOne<Branch>()
            .WithMany()
            .HasForeignKey(t => t.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne<Repository>()
            .WithMany()
            .HasForeignKey(t => t.RepositoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne<TriggerType>()
            .WithMany()
            .HasForeignKey(t => t.TypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
