using Microsoft.Extensions.Localization;
using Nomium.MergeSensei.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Nomium.MergeSensei;

[Dependency(ReplaceServices = true)]
public class MergeSenseiBrandingProvider(IStringLocalizer<MergeSenseiResource> localizer) : DefaultBrandingProvider
{
    public override string AppName => localizer["AppName"];
}
