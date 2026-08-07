using System.Net;
using FinBuh.ApiSystem.Abstractions;
using FinBuh.ApiSystem.Options;
using FinBuh.ApiSystem.Shared;
using FinBuh.Common.Contracts.Request;
using Microsoft.Extensions.Options;

namespace FinBuh.ApiSystem.Services;

public class FeedbackService : IFeedbackService
{
    private readonly IEmailSender _emailSender;
    private readonly FeedbackOptions _feedbackOptions;
    
    
    public FeedbackService(IEmailSender emailSender,
        IOptions<FeedbackOptions> feedbackOptions)
    {
        _emailSender = emailSender;
        _feedbackOptions = feedbackOptions.Value;
    }
    
    public async Task<Result> CreateAsync(CreateFeedbackRequest request, CancellationToken cancellationToken)
    {
        if (IsBot(request))
        {
            return Result.Success();
        }
        var name = Normalize(request.Name);
        var contact = Normalize(request.Contact);
        var message = Normalize(request.Message);

        var validationResult = Validate(name, contact, message);

        if (!validationResult.IsSuccess)
        {
            return validationResult;
        }
        
        var subject = $"Новая заявка с сайта ФинБУХ — {name}";
        var textBody = BuildTextBody(name, contact, message);
        var htmlBody = BuildHtmlBody(name, contact, message);
        try
        {
            await _emailSender.SendAsync(
                _feedbackOptions.ReceiverEmail,
                _feedbackOptions.ReceiverName,
                subject,
                textBody,
                htmlBody,
                cancellationToken);
            return Result.Success();
        }
        catch (Exception)
        {
            return Result.Failure(
                ErrorCodes.EmailSendFailed,
                "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую.",
                ErrorType.Infrastructure);
        }
    }
    
    private Result Validate(string name, string contact, string message)
    {
        if (name.Length < _feedbackOptions.MinNameLength)
        {
            return Result.Failure(
                ErrorCodes.ValidationFailed,
                "Укажите имя.",
                ErrorType.Validation);
        }

        if (name.Length > _feedbackOptions.MaxNameLength)
        {
            return Result.Failure(
                ErrorCodes.ValidationFailed,
                $"Имя не должно быть длиннее {_feedbackOptions.MaxNameLength} символов.",
                ErrorType.Validation);
        }

        if (contact.Length < _feedbackOptions.MinContactLength)
        {
            return Result.Failure(
                ErrorCodes.ValidationFailed,
                "Укажите телефон или email для связи.",
                ErrorType.Validation);
        }

        if (contact.Length > _feedbackOptions.MaxContactLength)
        {
            return Result.Failure(
                ErrorCodes.ValidationFailed,
                $"Контакт не должен быть длиннее {_feedbackOptions.MaxContactLength} символов.",
                ErrorType.Validation);
        }

        if (message.Length < _feedbackOptions.MinMessageLength)
        {
            return Result.Failure(
                ErrorCodes.ValidationFailed,
                "Опишите задачу чуть подробнее.",
                ErrorType.Validation);
        }

        if (message.Length > _feedbackOptions.MaxMessageLength)
        {
            return Result.Failure(
                ErrorCodes.ValidationFailed,
                $"Сообщение не должно быть длиннее {_feedbackOptions.MaxMessageLength} символов.",
                ErrorType.Validation);
        }

        return Result.Success();
    }
    
    private static string Normalize(string? value)
    {
        return value?.Trim() ?? string.Empty;
    }
    
    private static bool IsBot(CreateFeedbackRequest request)
    {
        return !string.IsNullOrWhiteSpace(request.Website);
    }
    
    private static string BuildTextBody(string name, string contact, string message)
    {
        return $"""
                Новая заявка с сайта ФинБУХ

                Имя: {name}
                Контакт: {contact}

                Сообщение:
                {message}
                """;
    }
    
    private static string BuildHtmlBody(string name, string contact, string message)
    {
        var safeName = WebUtility.HtmlEncode(name);
        var safeContact = WebUtility.HtmlEncode(contact);
        var safeMessage = WebUtility
            .HtmlEncode(message)
            .Replace("\n", "<br>");

        return $"""
                <h2>Новая заявка с сайта ФинБУХ</h2>

                <p><strong>Имя:</strong> {safeName}</p>
                <p><strong>Контакт:</strong> {safeContact}</p>

                <p><strong>Сообщение:</strong></p>
                <p>{safeMessage}</p>
                """;
    }
}