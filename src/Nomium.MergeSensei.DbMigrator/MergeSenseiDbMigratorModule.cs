using Nomium.MergeSensei.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Nomium.MergeSensei.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(MergeSenseiEntityFrameworkCoreModule),
    typeof(MergeSenseiApplicationContractsModule)
)]
public class MergeSenseiDbMigratorModule : AbpModule
{
}
