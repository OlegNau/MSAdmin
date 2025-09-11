using System;
using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.Repositories.Dtos;

public class RepositoryDto : EntityDto<Guid>
{
    public string Name { get; set; }
    public string Url { get; set; }
    public string WebhookUrl { get; set; }
    public bool IsActive { get; set; }
    public Guid ProjectId { get; set; }
}