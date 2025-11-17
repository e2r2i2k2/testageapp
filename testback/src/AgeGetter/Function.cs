using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace PostNLApp
{
    /// <summary>
    /// This is the main API Gateway class
    /// </summary>
    public class Function
    {
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest apigProxyEvent, ILambdaContext context)
        {
            // Get string name
            var nameResult = Helpers.TryGetNameFromParameters(apigProxyEvent.QueryStringParameters);
            var ageResult = new StringResponse();

            // If there was no error yet, try to call the external API to grab the age
            if (nameResult.Error == ErrorTypes.None)
            {
                try
                {
                    var ageTask = ExternalCommManager.TryGetAgeFromName(nameResult.Content);
                    await ageTask;
                    ageResult = ageTask.Result;
                }
                catch(Exception ex)
                {
                    Console.WriteLine($"Error when getting age: {ex.Message}");
                    ageResult.Error = ErrorTypes.UnknownServerError;
                }
            }

            var pageContent = PageCreator.GetPageStringContent(nameResult, ageResult);
            var body = $"{{\"message\":{pageContent}}}";

            return new APIGatewayProxyResponse
            {
                Body = body,
                StatusCode = 200,
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
            };
        }
    }
}
