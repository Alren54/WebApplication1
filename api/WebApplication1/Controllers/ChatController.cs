using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly OpenAIService _openAIService;

    public ChatController(OpenAIService openAIService)
    {
        _openAIService = openAIService;
    }

    [HttpPost("GetChatResponse")]
    public async Task<IActionResult> GetChatResponse([FromBody] ChatRequest request)
    {
        try
        {
            var response = await _openAIService.GenerateTextAsync(request.Prompt);
            return Ok(new { Response = response });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}

public class ChatRequest
{
    public string Prompt { get; set; }
}
