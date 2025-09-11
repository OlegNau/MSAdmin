using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Nomium.MergeSensei.Pipelines;

namespace Nomium.MergeSensei.Configurations;

public class PipelineNodeConfiguration : IEntityTypeConfiguration<PipelineNode>
{
    public void Configure(EntityTypeBuilder<PipelineNode> builder)
    {
        builder.ToTable("PipelineNode");

        builder.HasKey(pn => new { pn.NodeId, pn.PipelineId });

        builder.HasOne<Node>()
            .WithMany()
            .HasForeignKey(pn => pn.NodeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Pipeline>()
            .WithMany()
            .HasForeignKey(pn => pn.PipelineId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
