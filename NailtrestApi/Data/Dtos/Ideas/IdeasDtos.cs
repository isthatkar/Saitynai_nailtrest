using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data.Dtos.Ideas
{
    public record IdeaDto(int Id, string Name, string Description, DateTime CreatedDate, string ImageUrl, string Complexity, string RequiredMeans, string Instruction, bool IsVerified, Collection CollectionId);
    public record CollectionsIdeaDto(int Id, string Name, string Description, DateTime CreatedDate, string ImageUrl, string Complexity, string RequiredMeans, string Instruction, bool IsVerified);

    public record CreateIdeaDto(string Name, string Description, string ImageUrl, string Complexity, string RequiredMeans, string Instruction);
    public record UpdateIdeaDto(string Name, string Description, string ImageUrl, string Complexity, string RequiredMeans, string Instruction);
}
