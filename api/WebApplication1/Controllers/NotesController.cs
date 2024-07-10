using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebApplication1Controller : ControllerBase
    {
        // Mock data for demonstration purposes
        private static List<Note> notes = new List<Note>
        {
            new Note { Id = 1, Description = "First note" },
            new Note { Id = 2, Description = "Second note" },
            new Note { Id = 3, Description = "Third note" },
            new Note { Id = 4, Description = "Fourth note" },
            new Note { Id = 5, Description = "Fifth note" }  // Ensure this entry is included
        };

        [HttpGet("GetNotes")]
        public IActionResult GetNotes()
        {
            return Ok(notes);
        }
    }

    public class Note
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
