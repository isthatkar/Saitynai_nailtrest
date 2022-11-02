using Microsoft.AspNetCore.Identity;

namespace NailtrestApi.Auth.Model
{
    public class ForumRestUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
