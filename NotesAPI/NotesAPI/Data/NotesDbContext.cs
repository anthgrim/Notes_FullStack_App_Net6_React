using Microsoft.EntityFrameworkCore;
using NotesAPI.Models.Entities;

namespace NotesAPI.Data
{
    public class NotesDbContext : DbContext
    {

        // Constructor
        public NotesDbContext(DbContextOptions options) : base(options) 
        { 
        }

        // Notes table
        public DbSet<Note> Notes { get; set; }
    }
}
