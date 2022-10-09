using NailtrestApi.Data.Dtos.Collections;
using NailtrestApi.Data.Entities;
using NailtrestApi.Helpers;

namespace NailtrestApi.Data.Repositories
{
    public interface ICollectionsRepository
    {
        Task CreateAsync(Collection collection);
        Task DeleteAsync(Collection collection);
        Task<Collection?> GetAsync(int collectionId);
        Task<IReadOnlyList<Collection>> GetManyAsync();
        Task<PageList<Collection>> GetManyAsync(CollectionsParameters parameters);
        Task UpdateAsync(Collection collection);
    }
}