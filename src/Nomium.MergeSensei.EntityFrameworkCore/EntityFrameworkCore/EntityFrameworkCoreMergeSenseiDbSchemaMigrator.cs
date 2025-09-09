using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Nomium.MergeSensei.Data;
using Volo.Abp.DependencyInjection;

namespace Nomium.MergeSensei.EntityFrameworkCore;

public class EntityFrameworkCoreMergeSenseiDbSchemaMigrator(IServiceProvider serviceProvider) : IMergeSenseiDbSchemaMigrator, ITransientDependency
{
    public async Task MigrateAsync()
    {
        /* We intentionally resolving the MergeSenseiDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await serviceProvider
            .GetRequiredService<MergeSenseiDbContext>()
            .Database
            .MigrateAsync();
    }
}
