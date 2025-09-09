using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;

namespace Nomium.MergeSensei.Configurations;

public class GroupProjectConfiguration : IEntityTypeConfiguration<GroupProject>
{
    public void Configure(EntityTypeBuilder<GroupProject> builder)
    {
        builder.ToTable("GroupProject");

        builder.HasKey(gp => new { gp.GroupId, gp.ProjectId });

        builder.HasOne<Group>()
            .WithMany()
            .HasForeignKey(gp => gp.GroupId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Project>()
            .WithMany()
            .HasForeignKey(gp => gp.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
