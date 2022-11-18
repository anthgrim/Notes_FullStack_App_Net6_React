using Microsoft.EntityFrameworkCore;
using NotesAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Adding Db Context as a service
builder.Services.AddDbContext<NotesDbContext>(opt => opt.UseSqlServer(
    builder.Configuration.GetConnectionString("NotesDbConnectionString")));

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
