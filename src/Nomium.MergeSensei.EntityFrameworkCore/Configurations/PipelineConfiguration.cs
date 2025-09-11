using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Pipelines;

namespace Nomium.MergeSensei.Configurations;

public class PipelineConfiguration : IEntityTypeConfiguration<Pipeline>
{
    public void Configure(EntityTypeBuilder<Pipeline> b)
    {
        b.ToTable("Pipelines");
        b.Property(p => p.Name).IsRequired().HasMaxLength(256);
        b.Property(p => p.ProjectId).IsRequired();
        b.Property(p => p.IsActive).IsRequired();
        b.Property(p => p.RepositoryId).IsRequired();
        b.Property(p => p.BranchId).IsRequired();
        b.Property(p => p.TriggerTypeId).IsRequired();

        b.HasMany(p => p.Agents)
         .WithOne()
         .HasForeignKey(x => x.PipelineId)
         .OnDelete(DeleteBehavior.Cascade);
    }
}

public class PipelineAgentConfiguration : IEntityTypeConfiguration<PipelineAgent>
{
    public void Configure(EntityTypeBuilder<PipelineAgent> b)
    {
        b.ToTable("PipelineAgent");
        b.HasKey(x => new { x.PipelineId, x.AiModelId });
    }
}
