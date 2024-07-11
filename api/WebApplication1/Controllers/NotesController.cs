using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebApplication1Controller : ControllerBase
    {
        // Mock data for demonstration purposes
        private static List<Note> notes = new List<Note>();

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
