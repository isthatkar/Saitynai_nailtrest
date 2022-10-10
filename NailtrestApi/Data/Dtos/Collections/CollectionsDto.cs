namespace NailtrestApi.Data.Dtos.Collections
{
    public record CollectionDto(int Id, string Name, string Description, DateTime CreatedDate);
    public record CreateCollectionDto(string Name, string Description);
    public record UpdateCollectionDto(string? Name, string? Description);
}
