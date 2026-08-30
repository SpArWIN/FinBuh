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
    private readonly ILogger<FeedbackService> _logger;
    

    public FeedbackService(IEmailSender emailSender,
        IOptions<FeedbackOptions> feedbackOptions, ILogger<FeedbackService> logger)
    {
        _emailSender = emailSender;
        _logger = logger;
        _feedbackOptions = feedbackOptions.Value;
    }
    
    public async Task<Result> CreateAsync(CreateFeedbackRequest request, CancellationToken cancellationToken)
    {
        if (IsBot(request))
        {
            _logger.LogInformation("Feedback request ignored by honeypot.");
            return Result.Success();
        }
        var name = Normalize(request.Name);
        var contact = Normalize(request.Contact);
        var message = Normalize(request.Message);

        var validationResult = Validate(name, contact, message);

        if (!validationResult.IsSuccess)
        {
            _logger.LogWarning(
                "Feedback validation failed. Code: {Code}. Message: {Message}. Contact: {Contact}",
                validationResult.Error?.Code,
                validationResult.Error?.Message,
                contact);

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
            _logger.LogInformation(
                "Feedback email sent successfully. Name: {Name}, Contact: {Contact}, ReceiverEmail: {ReceiverEmail}",
                name,
                contact,
                _feedbackOptions.ReceiverEmail);
            
            return Result.Success();
        }
        catch (Exception exception)
        {
            _logger.LogError(
                exception,
                "Failed to send feedback email. Name: {Name}, Contact: {Contact}, ReceiverEmail: {ReceiverEmail}",
                name,
                contact,
                _feedbackOptions.ReceiverEmail);
            
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