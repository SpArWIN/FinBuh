namespace FinBuh.ApiSystem.Shared;

public sealed record AppError(
    string Code,
    string Message,
    ErrorType Type);
    