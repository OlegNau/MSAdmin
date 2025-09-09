using Xunit;

namespace Nomium.MergeSensei.EntityFrameworkCore;

[CollectionDefinition(MergeSenseiTestConsts.CollectionDefinitionName)]
public class MergeSenseiEntityFrameworkCoreCollection : ICollectionFixture<MergeSenseiEntityFrameworkCoreFixture>
{

}
