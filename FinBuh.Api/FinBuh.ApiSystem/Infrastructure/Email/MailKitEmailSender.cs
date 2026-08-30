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
    private readonly ILogger<MailKitEmailSender> _logger;
    public MailKitEmailSender(IOptions<SmtpOptions> options, ILogger<MailKitEmailSender> logger)
    {
        _logger = logger;
        _options = options.Value;
    }
    
        public async Task SendAsync(
        string toEmail,
        string toName,
        string subject,
        string textBody,
        string htmlBody,
        CancellationToken cancellationToken)
    {
        var message = BuildMessage(
            toEmail,
            toName,
            subject,
            textBody,
            htmlBody);

        var secureSocketOptions = GetSecureSocketOptions();

        using var smtpClient = new SmtpClient();

        try
        {
            _logger.LogInformation(
                "Connecting to SMTP server. Host: {Host}, Port: {Port}, SecureSocketOptions: {SecureSocketOptions}, UserName: {UserName}, FromEmail: {FromEmail}, ToEmail: {ToEmail}",
                _options.Host,
                _options.Port,
                secureSocketOptions,
                _options.UserName,
                _options.FromEmail,
                toEmail);

            await smtpClient.ConnectAsync(
                _options.Host,
                _options.Port,
                secureSocketOptions,
                cancellationToken);

            _logger.LogInformation(
                "Connected to SMTP server. Host: {Host}, Port: {Port}, IsSecure: {IsSecure}, AuthenticationMechanisms: {AuthenticationMechanisms}",
                _options.Host,
                _options.Port,
                smtpClient.IsSecure,
                string.Join(", ", smtpClient.AuthenticationMechanisms));

            _logger.LogInformation(
                "Authenticating SMTP user. UserName: {UserName}",
                _options.UserName);

            await smtpClient.AuthenticateAsync(
                _options.UserName,
                _options.Password,
                cancellationToken);

            _logger.LogInformation(
                "SMTP authentication succeeded. UserName: {UserName}",
                _options.UserName);

            await smtpClient.SendAsync(message, cancellationToken);

            _logger.LogInformation(
                "Email sent successfully. ToEmail: {ToEmail}, Subject: {Subject}",
                toEmail,
                subject);
        }
        catch (Exception exception)
        {
            _logger.LogError(
                exception,
                "SMTP sending failed. Host: {Host}, Port: {Port}, UserName: {UserName}, FromEmail: {FromEmail}, ToEmail: {ToEmail}, SecureSocketOptions: {SecureSocketOptions}",
                _options.Host,
                _options.Port,
                _options.UserName,
                _options.FromEmail,
                toEmail,
                secureSocketOptions);

            throw;
        }
        finally
        {
            if (smtpClient.IsConnected)
            {
                try
                {
                    await smtpClient.DisconnectAsync(true, cancellationToken);
                }
                catch (Exception exception)
                {
                    _logger.LogWarning(
                        exception,
                        "Failed to disconnect from SMTP server gracefully.");
                }
            }
        }
    }

    private MimeMessage BuildMessage(
        string toEmail,
        string toName,
        string subject,
        string textBody,
        string htmlBody)
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

        return message;
    }

    private SecureSocketOptions GetSecureSocketOptions()
    {
        if (_options.Port == 465)
        {
            return SecureSocketOptions.SslOnConnect;
        }

        if (_options.UseStartTls)
        {
            return SecureSocketOptions.StartTls;
        }

        return SecureSocketOptions.Auto;
    }
}