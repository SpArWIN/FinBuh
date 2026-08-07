namespace FinBuh.Common.Contracts.Request;

public class ErrorResponse
{
    public string Code { get; init; } = string.Empty;

    public string Message { get; init; } = string.Empty;
}