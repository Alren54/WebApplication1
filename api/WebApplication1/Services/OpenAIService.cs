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
                    messages = new object[]
                    {
                        new { role = "system", content = "You are an AI assistant that helps people find information." },
                        new { role = "user", content = prompt }
                    },
                    temperature = 0.7,
                    top_p = 0.95,
                    max_tokens = 150,
                    stream = false
                };

                var jsonRequest = JsonConvert.SerializeObject(requestContent);
                var requestContentString = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(_endpoint, requestContentString);

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    dynamic responseData = JsonConvert.DeserializeObject(jsonResponse);
                    string chatResponse = responseData.choices[0].message.content.ToString();
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
                    throw new HttpRequestException($"OpenAI request failed with status code {response.StatusCode}. Error: {errorMessage}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while processing OpenAI response: {ex.Message}");
                throw;
            }
        }

        throw new ApplicationException($"Failed to get response from OpenAI after {maxRetries} retries.");
    }

    public async Task<string> GenerateSummaryAsync(string prompt)
    {
        const int maxRetries = 3;
        int retryCount = 0;
        Console.WriteLine($"Prompt From US: {prompt}");
        while (retryCount < maxRetries)
        {
            try
            {
                var requestContent = new
                {
                    messages = new object[]
                    {
                        new { role = "system", content = "You are an AI assistant that helps to put a title to the conversations." },
                        new { role = "user", content = $"Give a title to the following conversation: {prompt}" }
                    },
                    temperature = 0.7,
                    top_p = 0.95,
                    max_tokens = 50,
                    stream = false
                };

                var jsonRequest = JsonConvert.SerializeObject(requestContent);
                var requestContentString = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(_endpoint, requestContentString);

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    dynamic responseData = JsonConvert.DeserializeObject(jsonResponse);
                    string summaryResponse = responseData.choices[0].message.content.ToString();
                    Console.WriteLine($"Answer From AI: {summaryResponse}");
                    return summaryResponse;
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
                    throw new HttpRequestException($"OpenAI request failed with status code {response.StatusCode}. Error: {errorMessage}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while processing OpenAI response: {ex.Message}");
                throw;
            }
        }

        throw new ApplicationException($"Failed to get response from OpenAI after {maxRetries} retries.");
    }
}
