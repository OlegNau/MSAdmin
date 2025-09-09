using Volo.Abp.Modularity;

namespace Nomium.MergeSensei;

[DependsOn(
    typeof(MergeSenseiApplicationModule),
    typeof(MergeSenseiDomainTestModule)
)]
public class MergeSenseiApplicationTestModule : AbpModule
{

}
