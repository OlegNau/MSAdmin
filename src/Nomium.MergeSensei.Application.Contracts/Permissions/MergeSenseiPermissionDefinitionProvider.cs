using Nomium.MergeSensei.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Nomium.MergeSensei.Permissions;

public class MergeSenseiPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(MergeSenseiPermissions.GroupName, L("Permission:MergeSensei"));

        var aiModelsPermission = myGroup.AddPermission(
            MergeSenseiPermissions.AiModels.Default,
            L("Permission:AIModels")
        );

        aiModelsPermission.AddChild(
            MergeSenseiPermissions.AiModels.Create,
            L("Permission:Create")
        );

        aiModelsPermission.AddChild(
            MergeSenseiPermissions.AiModels.Edit,
            L("Permission:Edit")
        );

        aiModelsPermission.AddChild(
            MergeSenseiPermissions.AiModels.Delete,
            L("Permission:Delete")
        );
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<MergeSenseiResource>(name);
    }
}