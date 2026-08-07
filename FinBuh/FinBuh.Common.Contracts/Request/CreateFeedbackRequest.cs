namespace FinBuh.Common.Contracts.Request;

public sealed class CreateFeedbackRequest
{
    public string? Name { get; init; }

    public string? Contact { get; init; }

    public string? Message { get; init; }

    /// <summary>
    /// Скрытое поле-антиспам. Реальный пользователь его не заполняет.
    /// </summary>
    public string? Website { get; init; }
}