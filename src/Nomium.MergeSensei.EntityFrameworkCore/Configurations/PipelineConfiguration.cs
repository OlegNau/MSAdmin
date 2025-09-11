using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Pipelines;
using Nomium.MergeSensei.Repositories;
using Nomium.MergeSensei.Branches;

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

        b.HasIndex(p => p.ProjectId);
        b.HasIndex(p => p.RepositoryId);
        b.HasIndex(p => p.BranchId);
        b.HasIndex(p => p.TriggerTypeId);

        b.HasMany(p => p.Agents)
         .WithOne()
         .HasForeignKey(x => x.PipelineId)
         .OnDelete(DeleteBehavior.Cascade);

        b.HasOne<Repository>()
         .WithMany()
         .HasForeignKey(p => p.RepositoryId)
         .OnDelete(DeleteBehavior.Restrict);

        b.HasOne<Branch>()
         .WithMany()
         .HasForeignKey(p => p.BranchId)
         .OnDelete(DeleteBehavior.Restrict);
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
