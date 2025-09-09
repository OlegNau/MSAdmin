using System;
using Microsoft.Extensions.DependencyInjection;
using Nomium.MergeSensei.Contracts.Repositories;
using Nomium.MergeSensei.Repositories;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.PostgreSql;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.Studio;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Nomium.MergeSensei.EntityFrameworkCore;

[DependsOn(
    typeof(MergeSenseiDomainModule),
    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpEntityFrameworkCorePostgreSqlModule),
    typeof(AbpBackgroundJobsEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule),
    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule),
    typeof(BlobStoringDatabaseEntityFrameworkCoreModule)
    )]
public class MergeSenseiEntityFrameworkCoreModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        // https://www.npgsql.org/efcore/release-notes/6.0.html#opting-out-of-the-new-timestamp-mapping-logic
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        MergeSenseiEfCoreEntityExtensionMappings.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<MergeSenseiDbContext>(options =>
        {
                /* Remove "includeAllEntities: true" to create
                 * default repositories only for aggregate roots */
            options.AddDefaultRepositories(includeAllEntities: true);
        });

        if (AbpStudioAnalyzeHelper.IsInAnalyzeMode)
        {
            return;
        }

        Configure<AbpDbContextOptions>(options =>
        {
            /* The main point to change your DBMS.
             * See also MergeSenseiDbContextFactory for EF Core tooling. */

            options.UseNpgsql();

        });

        context.Services.AddScoped<IAiModelRepository, AiModelRepository>();
        context.Services.AddScoped<IBranchRepository, BranchRepository>();
        context.Services.AddScoped<IProjectRepository, ProjectRepository>();
        context.Services.AddScoped<IRepositoryRepository, RepositoryRepository>();
        context.Services.AddScoped<IGroupRepository, GroupRepository>();
        context.Services.AddScoped<ITriggerRepository, TriggerRepository>();
        context.Services.AddScoped<ITriggerTypeRepository, TriggerTypeRepository>();
        context.Services.AddScoped<IPipelineRepository, PipelineRepository>();
        context.Services.AddScoped<INodeRepository, NodeRepository>();
        context.Services.AddScoped<INodeTypeRepository, NodeTypeRepository>();
    }
}
