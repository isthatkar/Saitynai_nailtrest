using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data.Repositories
{
    public interface ICollectionsRepository
    {
        Task CreateAsync(Collection collection);
        Task DeleteAsync(Collection collection);
        Task<Collection?> GetAsync(int collectionId);
        Task<IReadOnlyList<Collection>> GetManyAsync();
        Task UpdateAsync(Collection collection);
    }
}