using Microsoft.Extensions.DependencyInjection;
using N8n.PublicApi;
using Nomium.MergeSensei.AiModels;
using Nomium.MergeSensei.Branches;
using Nomium.MergeSensei.Groups;
using Nomium.MergeSensei.Nodes;
using Nomium.MergeSensei.NodeTypes;
using Nomium.MergeSensei.Pipelines;
using Nomium.MergeSensei.Projects;
using Nomium.MergeSensei.Repositories;
using Nomium.MergeSensei.Triggers;
using Nomium.MergeSensei.TriggerTypes;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Nomium.MergeSensei;

[DependsOn(
    typeof(MergeSenseiDomainModule),
    typeof(MergeSenseiApplicationContractsModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpAccountApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
public class MergeSenseiApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(opt =>
        {
            opt.AddMaps<MergeSenseiApplicationModule>(validate: true);
        });

        context.Services.AddScoped<IAiModelAppService, AiModelAppService>();
        context.Services.AddScoped<IBranchAppService, BranchAppService>();
        context.Services.AddScoped<IProjectAppService, ProjectAppService>();
        context.Services.AddScoped<IRepositoryAppService, RepositoryAppService>();
        context.Services.AddScoped<IGroupAppService, GroupAppService>();
        context.Services.AddScoped<ITriggerAppService, TriggerAppService>();
        context.Services.AddScoped<ITriggerTypeAppService, TriggerTypeAppService>();
        context.Services.AddScoped<IPipelineAppService, PipelineAppService>();
        context.Services.AddScoped<INodeAppService, NodeAppService>();
        context.Services.AddScoped<INodeTypeAppService, NodeTypeAppService>();

        context.Services.ConfigureRefitClients();
    }
}
