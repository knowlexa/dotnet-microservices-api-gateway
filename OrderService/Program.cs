using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Polly;
using Polly.Extensions.Http;
using System.Net.Http;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http; // Add this namespace for IHttpClientBuilder extensions

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

static IAsyncPolicy<HttpResponseMessage> RetryPolicy() =>
HttpPolicyExtensions
.HandleTransientHttpError()
.WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));


builder.Services.AddHttpClient("product-client", c =>
{
        c.BaseAddress = new Uri("http://productservice:8080/");

})
.AddPolicyHandler(RetryPolicy());
//.AddHttpMessageHandler(() => new PolicyHttpMessageHandler(RetryPolicy()));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidateAudience = true,
        ValidAudience = "api-audience",
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.MapControllers();

app.Run();
