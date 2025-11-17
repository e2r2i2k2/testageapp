using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

namespace PostNLApp
{
    /// <summary>
    /// Class to handle talking with external resources
    /// In this case, Agify
    /// </summary>
    internal static class ExternalCommManager
    {
        // use one instance of HttpClient for the app lifetime
        private static readonly HttpClient client = new HttpClient();

        private static bool fakeAPI = true;

        public static async Task<StringResponse> TryGetAgeFromName(string name)
        {
            if (fakeAPI)
            {
                return new StringResponse() { Content = "555" };
            }

            client.DefaultRequestHeaders.Accept.Clear();

            // Send req to Agify
            // See API docs: https://agify.io/documentation
            var request = $"https://api.agify.io/?name={name}";
            Console.WriteLine($"Sending request: {request}");
            var response = await client.GetStringAsync(request).ConfigureAwait(continueOnCapturedContext: false);


            try
            {
                Console.WriteLine($"Message received: {response}");
                Dictionary<string, JsonElement> messageObjectDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(response);

                if (messageObjectDict.ContainsKey("age"))
                {
                    var ageString = messageObjectDict["age"].ToString();
                    return new StringResponse() { Content = ageString, Error = ErrorTypes.None };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: Could not parse age: {ex.Message}");
            }

            return new StringResponse() { Content = "", Error = ErrorTypes.ExternalServerError };
        }
    }
}
