using NailtrestApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace NailtrestApi.Data.Repositories
{
    public class IdeasRepository : IIdeasRepository
    {
        private readonly NailtrestDbContext _nailtrestDbContext;

        public IdeasRepository(NailtrestDbContext nailtrestDbContext)
        {
            _nailtrestDbContext = nailtrestDbContext;
        }

        public async Task<Idea?> GetAsync(int ideaId) =>
            await _nailtrestDbContext.Ideas.FirstOrDefaultAsync(d => d.Id == ideaId);

        public async Task<IReadOnlyList<Idea>> GetManyAsync(int collectionId) =>
            await _nailtrestDbContext.Ideas.Where(d => d.Collection.Id == collectionId).ToListAsync();

        public async Task CreateAsync(Idea idea)
        {
            _nailtrestDbContext.Ideas.Add(idea);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Idea idea)
        {
            _nailtrestDbContext.Ideas.Remove(idea);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Idea idea)
        {
            _nailtrestDbContext.Ideas.Update(idea);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Idea>> GetAllAsync() =>
              await _nailtrestDbContext.Ideas.ToListAsync();

    }
}
