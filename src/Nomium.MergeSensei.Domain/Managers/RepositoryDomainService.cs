using Nomium.MergeSensei.Entities;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace Nomium.MergeSensei.Managers;

public class RepositoryDomainService : DomainService
{
    public void ChangeIsActive(Repository repository, bool isActive)
    {
        Check.NotNull(repository, nameof(repository));

        repository.IsActive = isActive;
    }
}