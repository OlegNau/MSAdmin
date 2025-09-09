using Volo.Abp.Settings;

namespace Nomium.MergeSensei.Settings;

public class MergeSenseiSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(MergeSenseiSettings.MySetting1));
    }
}
