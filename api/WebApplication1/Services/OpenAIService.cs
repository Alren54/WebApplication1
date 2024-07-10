using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class OpenAIService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _endpoint;

    public OpenAIService(HttpClient httpClient, string apiKey, string endpoint)
    {
        _httpClient = httpClient;
        _apiKey = apiKey;
        _endpoint = endpoint;

        _httpClient.DefaultRequestHeaders.Add("api-key", _apiKey);
    }

    public async Task<string> GenerateTextAsync(string prompt)
    {
        const int maxRetries = 3;
        int retryCount = 0;

        while (retryCount < maxRetries)
        {
            try
            {
                var requestContent = new
                {
                    prompt = prompt,
                    max_tokens = 150
                };

                var jsonRequest = JsonConvert.SerializeObject(requestContent);
                var requestContentString = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(_endpoint, requestContentString);

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    dynamic responseData = JsonConvert.DeserializeObject(jsonResponse);
                    string chatResponse = responseData.choices[0].text.ToString();

                    // Log successful response
                    Console.WriteLine($"Successful response from OpenAI: {jsonResponse}");

                    return chatResponse;
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                {
                    var waitTime = TimeSpan.FromSeconds(Math.Pow(2, retryCount));
                    await Task.Delay(waitTime);
                    retryCount++;
                }
                else
                {
                    var errorMessage = await response.Content.ReadAsStringAsync();

                    // Log error response
                    Console.WriteLine($"OpenAI request failed with status code {response.StatusCode}. Error: {errorMessage}");

                    throw new HttpRequestException($"OpenAI request failed with status code {response.StatusCode}. Error: {errorMessage}");
                }
            }
            catch (Exception ex)
            {
                // Log exception details
                Console.WriteLine($"An error occurred while processing OpenAI response: {ex.Message}");

                throw; // Re-throw the exception to propagate it up
            }
        }

        throw new ApplicationException($"Failed to get response from OpenAI after {maxRetries} retries.");
    }
}
