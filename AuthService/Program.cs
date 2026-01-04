using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.MapPost("/token", (TokenRequest req, IConfiguration config) =>
{
    if (string.IsNullOrEmpty(req.Username) || req.Password != "password")
        return Results.Unauthorized();


    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


    var claims = new[] { new Claim(ClaimTypes.Name, req.Username) };


    var token = new JwtSecurityToken(
    issuer: config["Jwt:Issuer"],
    audience: "api-audience",
    claims: claims,
    expires: DateTime.UtcNow.AddHours(1),
    signingCredentials: creds
    );


    return Results.Ok(new { access_token = new JwtSecurityTokenHandler().WriteToken(token) });
});


app.Run();


