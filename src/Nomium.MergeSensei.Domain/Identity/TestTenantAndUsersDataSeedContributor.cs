using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.TenantManagement;

namespace Nomium.MergeSensei.Identity;

public class TestTenantAndUsersDataSeedContributor(
    IRepository<Tenant, Guid> tenantRepository,
    ITenantManager tenantManager,
    IRepository<IdentityRole, Guid> roleRepository,
    IdentityUserManager userManager,
    IdentityRoleManager roleManager,
    IGuidGenerator guidGenerator,
    ICurrentTenant currentTenant,
    ILogger<TestTenantAndUsersDataSeedContributor> logger
    ) : IDataSeedContributor, ITransientDependency
{
    public async Task SeedAsync(DataSeedContext context)
    {
        if (context.TenantId == null)
        {
            var tenant = await CreateTestTenantAsync();

            using (currentTenant.Change(tenant.Id))
            {
                await CreateUsersAndAssignRolesAsync();
            }
        }
    }

    private async Task<Tenant> CreateTestTenantAsync()
    {
        var tenantName = "test-tenant";
        var tenant = await tenantRepository.FirstOrDefaultAsync(t => t.Name == tenantName);

        if (tenant == null)
        {
            // Используем TenantManager для правильного создания
            tenant = await tenantManager.CreateAsync(tenantName);
            await tenantRepository.InsertAsync(tenant);
            logger.LogInformation("Created test tenant: {TenantName}", tenantName);
        }
        else
        {
            logger.LogInformation("Test tenant already exists: {TenantName}", tenantName);
        }

        return tenant;
    }

    private async Task CreateUsersAndAssignRolesAsync()
    {
        // Создаем администратора (используем встроенную роль admin)
        await CreateRoleIfNotExistsAsync("admin");
        await CreateUserAsync(
            userName: "test-admin",
            email: "admin@test-tenant.com",
            password: "1q2w3E*",
            role: "admin"
        );

        // Создаем менеджера
        await CreateRoleIfNotExistsAsync("manager");
        await CreateUserAsync(
            userName: "test-manager",
            email: "manager@test-tenant.com",
            password: "1q2w3E*",
            role: "manager"
        );

        // Создаем разработчика
        await CreateRoleIfNotExistsAsync("reviewer");
        await CreateUserAsync(
            userName: "test-reviewer",
            email: "reviewer@test-tenant.com",
            password: "1q2w3E*",
            role: "reviewer"
        );

        // Создаем разработчика
        await CreateRoleIfNotExistsAsync("developer");
        await CreateUserAsync(
            userName: "test-dev",
            email: "dev@test-tenant.com",
            password: "1q2w3E*",
            role: "developer"
        );
    }

    private async Task CreateRoleIfNotExistsAsync(string roleName)
    {
        // Проверяем существование роли
        if (await roleRepository.AnyAsync(r => r.Name == roleName))
        {
            return;
        }

        // Создаем новую роль
        var role = new IdentityRole(
            guidGenerator.Create(),
            roleName,
            currentTenant.Id
        )
        {
            IsStatic = true,     // Защищает от случайного удаления
            IsPublic = true      // Видна для всех пользователей
        };

        // Создаем роль с валидацией
        var result = await roleManager.CreateAsync(role);

        // Обрабатываем ошибки
        if (!result.Succeeded)
        {
            var errors = result.Errors
                .Select(e => $"{e.Code}: {e.Description}")
                .JoinAsString(", ");

            throw new Exception($"Failed to create '{roleName}' role. Errors: {errors}");
        }
    }
    
    private async Task CreateUserAsync(
        string userName,
        string email,
        string password,
        string role)
    {
        // Проверяем, существует ли пользователь
        var user = await userManager.FindByNameAsync(userName);
        if (user != null)
        {
            logger.LogInformation("User already exists: {UserName}", userName);
            return;
        }

        // Создаем нового пользователя
        user = new IdentityUser(
            id: guidGenerator.Create(),
            userName: userName,
            email: email,
            tenantId: currentTenant.Id
        );

        // Создаем пользователя
        var createResult = await userManager.CreateAsync(user, password);
        if (!createResult.Succeeded)
        {
            var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
            logger.LogError("Failed to create user {UserName}: {Errors}", userName, errors);
            throw new Exception($"Failed to create user: {errors}");
        }

        // Назначаем роль пользователю
        var addToRoleResult = await userManager.AddToRoleAsync(user, role);
        if (!addToRoleResult.Succeeded)
        {
            var errors = string.Join(", ", addToRoleResult.Errors.Select(e => e.Description));
            logger.LogError("Failed to add role {Role} to user {UserName}: {Errors}",
                role, userName, errors);
            throw new Exception($"Failed to add role to user: {errors}");
        }

        logger.LogInformation("Created user {UserName} with role {Role}", userName, role);
    }
}