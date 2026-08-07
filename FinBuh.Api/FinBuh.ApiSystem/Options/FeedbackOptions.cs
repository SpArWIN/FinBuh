using System.ComponentModel.DataAnnotations;

namespace FinBuh.ApiSystem.Options;

public sealed class FeedbackOptions
{
    public const string SectionName = "Feedback";

    [Required]
    public string ReceiverEmail { get; init; } = string.Empty;

    [Required]
    public string ReceiverName { get; init; } = "ФинБУХ";

    [Range(2, 100)]
    public int MinNameLength { get; init; } = 2;

    [Range(2, 200)]
    public int MaxNameLength { get; init; } = 100;

    [Range(5, 200)]
    public int MinContactLength { get; init; } = 5;

    [Range(5, 200)]
    public int MaxContactLength { get; init; } = 120;

    [Range(10, 5000)]
    public int MinMessageLength { get; init; } = 10;

    [Range(10, 5000)]
    public int MaxMessageLength { get; init; } = 2000;
}