using System.Threading.Tasks;

namespace Nomium.MergeSensei.Data;

public interface IMergeSenseiDbSchemaMigrator
{
    Task MigrateAsync();
}
