using Nomium.MergeSensei.Samples;
using Xunit;

namespace Nomium.MergeSensei.EntityFrameworkCore.Domains;

[Collection(MergeSenseiTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<MergeSenseiEntityFrameworkCoreTestModule>
{

}
