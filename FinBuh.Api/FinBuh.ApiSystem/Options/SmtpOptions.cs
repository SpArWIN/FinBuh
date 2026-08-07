using System.ComponentModel.DataAnnotations;

namespace FinBuh.ApiSystem.Options;

public sealed class SmtpOptions
{
    public const string SectionName = "Smtp";
    [Required]
    public string Host { get; init; } = string.Empty;

    [Range(1, 65535)]
    public int Port { get; init; } = 587;

    [Required]
    public string UserName { get; init; } = string.Empty;

    [Required]
    public string Password { get; init; } = string.Empty;

    [Required]
    public string FromEmail { get; init; } = string.Empty;

    [Required]
    public string FromName { get; init; } = "ФинБУХ";

    public bool UseStartTls { get; init; } = true;
}