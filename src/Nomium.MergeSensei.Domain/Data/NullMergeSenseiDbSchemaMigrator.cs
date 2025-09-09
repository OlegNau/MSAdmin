using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Nomium.MergeSensei.Data;

/* This is used if database provider does't define
 * IMergeSenseiDbSchemaMigrator implementation.
 */
public class NullMergeSenseiDbSchemaMigrator : IMergeSenseiDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
