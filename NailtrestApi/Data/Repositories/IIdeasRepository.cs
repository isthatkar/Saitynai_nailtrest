using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data.Repositories
{
    public interface IIdeasRepository
    {
        Task CreateAsync(Idea idea);
        Task DeleteAsync(Idea idea);
        Task<Idea?> GetAsync(int ideaId);
        Task<IReadOnlyList<Idea>> GetManyAsync(int collectionId);

        Task<IReadOnlyList<Idea>> GetAllAsync();

        Task UpdateAsync(Idea idea);
    }
}