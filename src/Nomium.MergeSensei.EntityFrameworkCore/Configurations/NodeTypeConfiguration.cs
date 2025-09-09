using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nomium.MergeSensei.Entities;

namespace Nomium.MergeSensei.Configurations;

public class NodeTypeConfiguration : IEntityTypeConfiguration<NodeType>
{
    public void Configure(EntityTypeBuilder<NodeType> builder)
    {
        builder.ToTable("NodeTypes");

        builder.HasKey(nt => nt.Id);

        builder.Property(nt => nt.Name)
            .IsRequired()
            .HasMaxLength(EntityConstraintConsts.EntityName.MaxLength);
    }
}
