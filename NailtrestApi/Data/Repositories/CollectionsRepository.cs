using NailtrestApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace NailtrestApi.Data.Repositories
{
    public class CollectionsRepository : ICollectionsRepository
    {
        private readonly NailtrestDbContext _nailtrestDbContext;

        public CollectionsRepository(NailtrestDbContext nailtrestDbContext)
        {
            _nailtrestDbContext = nailtrestDbContext;
        }

        public async Task<Collection?> GetAsync(int collectionId) =>
            await _nailtrestDbContext.Collections.FirstOrDefaultAsync(d => d.Id == collectionId);

        public async Task<IReadOnlyList<Collection>> GetManyAsync() =>
            await _nailtrestDbContext.Collections.ToListAsync();

        public async Task CreateAsync(Collection collection)
        {
            _nailtrestDbContext.Collections.Add(collection);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Collection collection)
        {
            _nailtrestDbContext.Collections.Remove(collection);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Collection collection)
        {
            _nailtrestDbContext.Collections.Update(collection);
            await _nailtrestDbContext.SaveChangesAsync();
        }
    }
}
