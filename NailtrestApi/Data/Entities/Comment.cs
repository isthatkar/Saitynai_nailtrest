using NailtrestApi.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace NailtrestApi.Data.Entities
{
    public class Comment : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }

        public Idea Idea { get; set; }

        [Required]
        public string UserId { get; set; }

        public ForumRestUser User { get; set; }
    }
}
