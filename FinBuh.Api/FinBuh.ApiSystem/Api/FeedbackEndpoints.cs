using FinBuh.ApiSystem.Abstractions;
using FinBuh.ApiSystem.Shared;
using FinBuh.Common.Contracts.Request;

namespace FinBuh.ApiSystem.Api;

/// <summary>
/// Minimal API.
/// </summary>
public static class FeedbackEndpoints
{
    public static IEndpointRouteBuilder MapFeedbackEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app
            .MapGroup("/api/feedback")
            .WithTags("Feedback");

        group.MapPost("/", CreateAsync);

        return app;
    }
    
    private static async Task<IResult> CreateAsync(
        CreateFeedbackRequest request,
        IFeedbackService feedbackService,
        CancellationToken cancellationToken)
    {
        var result = await feedbackService.CreateAsync(request, cancellationToken);

        if (result.IsSuccess)
        {
            return Results.Ok(new CreateFeedbackResponse
            {
                Message = "Заявка отправлена. Мы свяжемся с вами в ближайшее время."
            });
        }

        var error = result.Error!;

        var response = new ErrorResponse
        {
            Code = error.Code,
            Message = error.Message
        };

        return error.Type switch
        {
            ErrorType.Validation => Results.BadRequest(response),
            ErrorType.Infrastructure => Results.Json(response, statusCode: StatusCodes.Status500InternalServerError),
            _ => Results.Json(response, statusCode: StatusCodes.Status500InternalServerError)
        };
    }
}