namespace FinBuh.ApiSystem.Shared;

public class Result
{
    private Result(bool isSuccess, AppError? error)
    {
        IsSuccess = isSuccess;
        Error = error;
    }
    
    public bool IsSuccess { get; }

    public AppError? Error { get; }

    public static Result Success()
    {
        return new Result(true, null);
    }

    public static Result Failure(string code, string message, ErrorType type)
    {
        return new Result(false, new AppError(code, message, type));
    }
}