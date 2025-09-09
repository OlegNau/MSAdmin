namespace Nomium.MergeSensei.Entities;

public static class EntityConstraintConsts
{
    public static class EntityName
    {
        public const int MaxLength = 256;
        public const int MinLength = 2;
    }

    public static class Description
    {
        public const int MaxLength = 2048;
    }

    public static class Url
    {
        public const int MaxLength = 2048;
    }

    public static class Version
    {
        public const int MaxLength = 32;
    }

    public static class Status
    {
        public const int MaxLength = 32;
    }

    public static class Commit
    {
        public const int ShaMaxLength = 64;
    }

    public static class Vendor
    {
        public const int MaxLength = 128;
    }

    public static class Trigger
    {
        public const int NameMaxLength = 128;
    }

    public static class Node
    {
        public const int NameMaxLength = 128;
    }

    public static class GitAccessToken
    {
        public const int MaxLength = 512;
    }
}