﻿using System.ComponentModel.DataAnnotations;

namespace NailtrestApi.Auth
{
    public record RegisterUserDto([Required] string UserName, [EmailAddress][Required] string Email, [Required] string Password);
    public record LoginUserDto(string UserName, string Password);

    public record UserDto(string Id, string UserName, string Email);
    public record SuccessfulLoginDto(string AccessToken, string refreshToken);
    public record TokenDto(string? AccessToken, string RefreshToken);
}
