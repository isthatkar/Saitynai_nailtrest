using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using NailtrestApi.Auth.Model;
using System.Security.Claims;

namespace NailtrestApi.Auth
{
    public class ResourceOwnerAuthHandler : AuthorizationHandler<ResourceOwnerRequirement, IUserOwnedResource>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context, 
            ResourceOwnerRequirement requirement, 
            IUserOwnedResource resource)
        {
            if(context.User.IsInRole(ForumRoles.Admin) || 
                context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) == resource.UserId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public record ResourceOwnerRequirement : IAuthorizationRequirement;
}
