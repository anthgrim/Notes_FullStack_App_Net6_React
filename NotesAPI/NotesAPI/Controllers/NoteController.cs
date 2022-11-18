using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesAPI.Data;
using NotesAPI.Models.Entities;

namespace NotesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : Controller
    {
        private readonly NotesDbContext notesDbContext;
        public NoteController(NotesDbContext notesDbContext)
        {
            this.notesDbContext = notesDbContext;
        }

        // Get all the notes
        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            var notes = await notesDbContext.Notes.ToListAsync();
            // Get the notes from database
            return Ok(notes);
            
        }

        // Get a single note by id
        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetNoteById")]
        public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
        {
            var result = await notesDbContext.Notes.FindAsync(id);
            // await notesDbContext.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Create new Note
        [HttpPost]
        public async Task<IActionResult> AddNote(Note note)
        {
            note.Id = Guid.NewGuid();
            await notesDbContext.Notes.AddAsync(note);
            await notesDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNoteById), new {id = note.Id}, note);
        }

        // Update note by id
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNoteById([FromRoute] Guid id, [FromBody] Note update)
        {
            var targetNote = await notesDbContext.Notes.FindAsync(id);

            if (targetNote == null)
            {
                return NotFound();
            }

            // Perform update
            targetNote.Title = update.Title;
            targetNote.Description = update.Description;
            targetNote.IsVisible = update.IsVisible;

            // Save database
            await notesDbContext.SaveChangesAsync();

            return Ok(targetNote);
        }

        // Delete note by id
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteNoteById([FromRoute] Guid id)
        {
            var targetNote = await notesDbContext.Notes.FindAsync(id);

            if (targetNote == null)
            {
                return NotFound();
            }

            // Delete 
            notesDbContext.Notes.Remove(targetNote);

            // Update database
            await notesDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
