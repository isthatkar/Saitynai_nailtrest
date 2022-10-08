using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data.Dtos.Comments
{
    public record CommentDto(int Id, string Content, DateTime CreatedDate, Idea idea);
    public record IdeaCommentDto(int Id, string Content, DateTime CreatedDate);
    public record CreateCommentDto(string Content);
    public record UpdateCommentDto(string Content);
}
