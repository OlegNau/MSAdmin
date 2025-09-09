using Volo.Abp.Modularity;

namespace Nomium.MergeSensei;

[DependsOn(
    typeof(MergeSenseiDomainModule),
    typeof(MergeSenseiTestBaseModule)
)]
public class MergeSenseiDomainTestModule : AbpModule
{

}
