using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Pipelines;

namespace Nomium.MergeSensei.Configurations;

public class PipelineTriggerConfiguration : IEntityTypeConfiguration<PipelineTrigger>
{
    public void Configure(EntityTypeBuilder<PipelineTrigger> builder)
    {
        builder.ToTable("PipelineTrigger");

        builder.HasKey(pt => new { pt.PipelineId, pt.TriggerId });

        builder.HasOne<Pipeline>()
            .WithMany()
            .HasForeignKey(pt => pt.PipelineId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Trigger>()
            .WithMany()
            .HasForeignKey(pt => pt.TriggerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
