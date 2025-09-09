using Volo.Abp.Modularity;

namespace Nomium.MergeSensei;

/* Inherit from this class for your domain layer tests. */
public abstract class MergeSenseiDomainTestBase<TStartupModule> : MergeSenseiTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
