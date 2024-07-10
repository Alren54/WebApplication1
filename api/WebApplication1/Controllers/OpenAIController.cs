using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAIController : ControllerBase
    {
        private readonly OpenAIService _openAIService;

        public OpenAIController(OpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        [HttpPost("GenerateText")]
        public async Task<IActionResult> GenerateText([FromBody] PromptRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Prompt))
            {
                return BadRequest("Prompt is required.");
            }

            try
            {
                var result = await _openAIService.GenerateTextAsync(request.Prompt);
                return Ok(new { response = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }

    public class PromptRequest
    {
        public string Prompt { get; set; }
    }
}
