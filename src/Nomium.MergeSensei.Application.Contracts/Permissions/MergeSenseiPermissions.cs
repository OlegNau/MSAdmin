namespace Nomium.MergeSensei.Permissions;

public static class MergeSenseiPermissions
{
    public const string GroupName = "MergeSensei";

    public static class AiModels
    {
        public const string Default = GroupName + ".AiModels";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
}
