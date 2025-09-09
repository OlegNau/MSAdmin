using Nomium.MergeSensei.Samples;
using Xunit;

namespace Nomium.MergeSensei.EntityFrameworkCore.Applications;

[Collection(MergeSenseiTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<MergeSenseiEntityFrameworkCoreTestModule>
{

}
