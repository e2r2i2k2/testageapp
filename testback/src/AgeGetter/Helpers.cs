
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace PostNLApp
{
    public enum Locales
    {
        en_us,
        nl_nl,

        // TODO
    }

    public enum ErrorTypes
    {
        None,

        NameTooLong,
        EmptyName,
        UnknownServerError,
        ExternalServerError,
    }

    /// <summary>
    /// Helper class to pass a string value along with an error if a problem happened
    /// </summary>
    internal class StringResponse
    {
        public ErrorTypes Error = ErrorTypes.None;
        public string Content = string.Empty;
    }

    /// <summary>
    /// Static helper functions used by the app
    /// </summary>
    internal static class Helpers
    {
        /// <summary>
        /// Tries to get the name from the parameters, and cleans it.
        /// </summary>
        public static StringResponse TryGetNameFromParameters(IDictionary<string, string> parameters)
        {
            if (parameters != null && parameters.ContainsKey("name"))
            {
                return TryCleanNameString(parameters["name"]);
            }

            return new StringResponse() { Error = ErrorTypes.EmptyName};
        }

        /// <summary>
        /// Cleans the input name string and outputs errors should there be problems
        /// </summary>
        public static StringResponse TryCleanNameString(string input)
        {
            var output = new StringResponse();

            // Reject empty strings
            if (string.IsNullOrEmpty(input))
            {
                output.Error = ErrorTypes.EmptyName;
                return output;
            }

            // Limit length
            if (input.Length > 50)
            {
                output.Error = ErrorTypes.NameTooLong;
                return output;
            }

            // Clean name
            output.Content = Regex.Replace(input, @"[^a-zA-Z]", "");

            return output;
        }

        /// <summary>
        /// Cleans the input age string (treated as an int)
        /// and outputs errors should there be problems
        /// </summary>
        public static StringResponse TryCleanAgeString(string input)
        {
            var output = new StringResponse();
            bool success = int.TryParse(input, out int intResult);

            if (!success)
            {
                output.Error = ErrorTypes.ExternalServerError;
                return output;
            }

            output.Content = intResult.ToString();
            return output;
        }
    }
}
