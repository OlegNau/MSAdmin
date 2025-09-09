using Volo.Abp.Modularity;

namespace Nomium.MergeSensei;

public abstract class MergeSenseiApplicationTestBase<TStartupModule> : MergeSenseiTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
