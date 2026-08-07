namespace FinBuh.ApiSystem.Abstractions;

public interface IEmailSender
{
    Task SendAsync(
        string toEmail,
        string toName,
        string subject,
        string textBody,
        string htmlBody,
        CancellationToken cancellationToken);
}