using Microsoft.AspNetCore.SignalR;

namespace NailtrestApi.Auth.Model
{
    public interface IUserOwnedResource
    {
        public string UserId { get; set; }
    }
}
