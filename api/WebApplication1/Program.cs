using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
    });

// Read the Azure OpenAI API key and endpoint from configuration
var openAiApiKey = builder.Configuration["AzureOpenAI:ApiKey"];
var openAiEndpoint = builder.Configuration["AzureOpenAI:Endpoint"];
if (string.IsNullOrEmpty(openAiApiKey) || string.IsNullOrEmpty(openAiEndpoint))
{
    throw new InvalidOperationException("Azure OpenAI API key or endpoint is missing in configuration.");
}

// Register the OpenAIService with a factory method
builder.Services.AddSingleton(sp => new OpenAIService(new HttpClient(), openAiApiKey, openAiEndpoint));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS
app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
