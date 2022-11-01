using NailtrestApi.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace NailtrestApi.Data.Entities
{
    public class Collection : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }

        [Required]
        public string UserId { get; set; }

        public ForumRestUser User { get; set; }
    }
}
