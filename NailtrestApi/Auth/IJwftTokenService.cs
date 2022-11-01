namespace NailtrestApi.Auth
{
    public interface IJwftTokenService
    {
        string CreateAccessToken(string userName, string userId, IEnumerable<string> userRoles);
    }
}