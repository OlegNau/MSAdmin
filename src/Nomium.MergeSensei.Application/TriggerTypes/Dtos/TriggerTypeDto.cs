using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.TriggerTypes.Dtos;

public class TriggerTypeDto : EntityDto<long>
{
    public string Name { get; set; }
} 