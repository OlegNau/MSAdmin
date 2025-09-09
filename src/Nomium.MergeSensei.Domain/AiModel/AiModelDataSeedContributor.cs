using System.Collections.Generic;
using System.Threading.Tasks;
using Nomium.MergeSensei.Contracts.Repositories;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Uow;

namespace Nomium.MergeSensei.AiModel;

public class AiModelDataSeedContributor(IAiModelRepository aiModelRepository)
    : IDataSeedContributor, ITransientDependency
{
    [UnitOfWork]
    public async Task SeedAsync(DataSeedContext context)
    {
        var popularModels = GetPopularAiModels();

        foreach (var model in popularModels)
        {
            if (!await aiModelRepository.AnyAsync(x => x.Id == model.Id))
            {
                await aiModelRepository.InsertAsync(model, autoSave: true);
            }
        }
    }

    private static List<Entities.AiModel> GetPopularAiModels()
    {
        return
        [
            new Entities.AiModel(
                id: 1,
                name: "GPT-4",
                vendor: "OpenAI"
            ),

            new Entities.AiModel(
                id: 2,
                name: "Gemini 1.5 Pro",
                vendor: "Google"
            ),

            new Entities.AiModel(
                id: 3,
                name: "Claude 3 Opus",
                vendor: "Anthropic"
            ),

            new Entities.AiModel(
                id: 4,
                name: "Llama 3",
                vendor: "Meta"
            ),

            new Entities.AiModel(
                id: 5,
                name: "Mixtral 8x7B",
                vendor: "Mistral AI"
            ),

            new Entities.AiModel(
                id: 6,
                name: "Command R+",
                vendor: "Cohere"
            ),

            new Entities.AiModel(
                id: 7,
                name: "DALL-E 3",
                vendor: "OpenAI"
            ),

            new Entities.AiModel(
                id: 8,
                name: "Stable Diffusion XL",
                vendor: "Stability AI"
            ),

            new Entities.AiModel(
                id: 9,
                name: "Jurassic-2 Ultra",
                vendor: "AI21 Labs"
            ),

            new Entities.AiModel(
                id: 10,
                name: "Yi-34B",
                vendor: "01.AI"
            ),

            new Entities.AiModel(
                id: 11,
                name: "Grok-1",
                vendor: "xAI"
            ),

            new Entities.AiModel(
                id: 12,
                name: "Ernie Bot",
                vendor: "Baidu"
            )
        ];
    }
}