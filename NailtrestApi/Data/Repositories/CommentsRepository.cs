using Microsoft.EntityFrameworkCore;
using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data.Repositories
{
    public class CommentsRepository : ICommentsRepository
    {
        private readonly NailtrestDbContext _nailtrestDbContext;

        public CommentsRepository(NailtrestDbContext nailtrestDbContext)
        {
            _nailtrestDbContext = nailtrestDbContext;
        }

        public async Task<Comment?> GetAsync(int commentId) =>
            await _nailtrestDbContext.Comments.FirstOrDefaultAsync(d => d.Id == commentId);

        public async Task<IReadOnlyList<Comment>> GetManyAsync(int ideaId) =>
            await _nailtrestDbContext.Comments.Where(d => d.Idea.Id == ideaId).ToListAsync();

        public async Task CreateAsync(Comment comment)
        {
            _nailtrestDbContext.Comments.Add(comment);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Comment comment)
        {
            _nailtrestDbContext.Comments.Remove(comment);
            await _nailtrestDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Comment comment)
        {
            _nailtrestDbContext.Comments.Update(comment);
            await _nailtrestDbContext.SaveChangesAsync();
        }
    }
}
