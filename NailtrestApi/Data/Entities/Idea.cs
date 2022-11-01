using NailtrestApi.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace NailtrestApi.Data.Entities
{
    public class Idea : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ImageUrl { get; set; }
        public string Complexity { get; set; }
        public string RequiredMeans { get; set; }
        public string Instruction { get; set; }
        public bool IsVerified { get; set; }
        public Collection Collection { get; set; }

        [Required]
        public string UserId { get; set; }

        public ForumRestUser User { get; set; }
    }
}
