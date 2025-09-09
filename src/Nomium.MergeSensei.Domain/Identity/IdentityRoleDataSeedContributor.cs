using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;

namespace Nomium.MergeSensei.Identity;

public class IdentityRoleDataSeedContributor(
    IRepository<IdentityRole, Guid> roleRepository,
    IGuidGenerator guidGenerator,
    ICurrentTenant currentTenant,
    IdentityRoleManager roleManager
    ) : IDataSeedContributor, ITransientDependency
{
    public async Task SeedAsync(DataSeedContext context)
    {
        using (currentTenant.Change(context.TenantId))
        {
            await CreateRoleIfNotExistsAsync("manager");
            await CreateRoleIfNotExistsAsync("reviewer");
            await CreateRoleIfNotExistsAsync("developer");
        }
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
}