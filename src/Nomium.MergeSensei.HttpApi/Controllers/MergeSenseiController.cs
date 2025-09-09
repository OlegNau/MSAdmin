using Nomium.MergeSensei.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Nomium.MergeSensei.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class MergeSenseiController : AbpControllerBase
{
    protected MergeSenseiController()
    {
        LocalizationResource = typeof(MergeSenseiResource);
    }
}
