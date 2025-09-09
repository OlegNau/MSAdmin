using Nomium.MergeSensei.Localization;
using Volo.Abp.Application.Services;

namespace Nomium.MergeSensei;

/* Inherit your application services from this class.
 */
public abstract class MergeSenseiAppService : ApplicationService
{
    protected MergeSenseiAppService()
    {
        LocalizationResource = typeof(MergeSenseiResource);
    }
}
