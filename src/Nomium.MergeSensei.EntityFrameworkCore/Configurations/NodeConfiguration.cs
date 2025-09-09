using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Nomium.MergeSensei.Configurations;

public class NodeConfiguration : IEntityTypeConfiguration<Node>
{
    public void Configure(EntityTypeBuilder<Node> builder)
    {
        builder.ToTable("Nodes");
        builder.ConfigureByConvention();
        builder.ConfigureExtraProperties();

        builder.HasKey(x => x.Id);

        builder.HasOne<NodeType>()
            .WithMany()
            .HasForeignKey(n => n.TypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
