using FinBuh.ApiSystem.Abstractions;
using FinBuh.ApiSystem.Api;
using FinBuh.ApiSystem.Infrastructure.Email;
using FinBuh.ApiSystem.Options;
using FinBuh.ApiSystem.Services;

var builder = WebApplication.CreateBuilder(args);

// ВНедрение зависимостей.
builder
    .Services
    .AddOptions<SmtpOptions>()
    .Bind(builder.Configuration.GetSection(SmtpOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services
    .AddOptions<FeedbackOptions>()
    .Bind(builder.Configuration.GetSection(FeedbackOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IEmailSender, MailKitEmailSender>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? [];

        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var app = builder.Build();
app.UseCors("Frontend");
app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    service = "FinBuh.Api"
}));

app.MapFeedbackEndpoints();


app.Run();