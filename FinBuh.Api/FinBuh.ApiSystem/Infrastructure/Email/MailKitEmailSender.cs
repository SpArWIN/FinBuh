using FinBuh.ApiSystem.Abstractions;
using FinBuh.ApiSystem.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FinBuh.ApiSystem.Infrastructure.Email;

public class MailKitEmailSender : IEmailSender
{
    private readonly SmtpOptions _options;

    public MailKitEmailSender(IOptions<SmtpOptions> options)
    {
        _options = options.Value;
    }
    
    public async Task SendAsync(string toEmail, 
        string toName, string subject,
        string textBody, 
        string htmlBody,
        CancellationToken cancellationToken)
    {
           var message = new MimeMessage();
           message.From.Add(new MailboxAddress(_options.FromName, _options.FromEmail));
           message.To.Add(new MailboxAddress(toName, toEmail));
           message.Subject = subject;
           message.Body = new BodyBuilder
           {
               TextBody = textBody,
               HtmlBody = htmlBody
           }.ToMessageBody();
           
           var secureSocketOptions = _options.UseStartTls
               ? SecureSocketOptions.StartTls
               : SecureSocketOptions.Auto;
           using var smtpClient = new SmtpClient();
           
           await smtpClient.ConnectAsync(
               _options.Host,
               _options.Port,
               secureSocketOptions,
               cancellationToken);
           await smtpClient.AuthenticateAsync(
               _options.UserName,
               _options.Password,
               cancellationToken);
           await smtpClient.SendAsync(message, cancellationToken);
           await smtpClient.DisconnectAsync(true, cancellationToken);
        
    }
}