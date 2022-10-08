using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data.Repositories
{
    public interface ICommentsRepository
    {
        Task CreateAsync(Comment comment);
        Task DeleteAsync(Comment comment);
        Task<Comment?> GetAsync(int commentId);
        Task<IReadOnlyList<Comment>> GetManyAsync(int ideaId);
        Task UpdateAsync(Comment comment);
    }
}