using FinBuh.ApiSystem.Shared;
using FinBuh.Common.Contracts.Request;

namespace FinBuh.ApiSystem.Abstractions;

public interface IFeedbackService
{
    Task<Result> CreateAsync(
        CreateFeedbackRequest request,
        CancellationToken cancellationToken);
}