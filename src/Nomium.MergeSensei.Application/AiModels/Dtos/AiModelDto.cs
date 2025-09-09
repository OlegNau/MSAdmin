using Volo.Abp.Application.Dtos;

namespace Nomium.MergeSensei.AiModels.Dtos;

public class AiModelDto : EntityDto<long>
{
    public string Name { get; set; }
    public string Vendor { get; set; }
}