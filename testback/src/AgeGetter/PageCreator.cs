using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace PostNLApp
{
    internal static class PageCreator
    {
        public struct PageLine
        {
            public string Type;
            public string Data;

            public override string ToString()
            {
                return $"{{\"type\": \"{Type}\", \"data\": \"{Data}\"}}";
            }
        }

        public static string GetPageStringContent(StringResponse name, StringResponse age)
        {
            // Generate the page content
            var pageLineData = GetPageLineContent(name, age);

            // Convert it to a JSON string
            var stringData = PageLinesToJsonString(pageLineData);

            return stringData;
        }

        private static List<PageLine> GetPageLineContent(StringResponse name, StringResponse age)
        {
            // TODO: Just like for the rest of the app, use string files and localization
            List<PageLine> output = new List<PageLine>();

            // Title
            output.Add(new PageLine() { Type = "heading", Data = "Amazing Age Guesser" });

            // Handle errors
            if (name.Error != ErrorTypes.None)
            {
                output.Add(new PageLine() { Type = "text", Data = "Error with your name: {GetErrorString(name.Error)}" });
            }

            if (age.Error != ErrorTypes.None)
            {
                output.Add(new PageLine() { Type = "text", Data = "Error with your age: {GetErrorString(age.Error)}" });
            }

            // Add age/name if it exists
            if (!string.IsNullOrEmpty(age.Content) && !string.IsNullOrEmpty(name.Content))
            {
                output.Add(new PageLine() { Type = "text", Data = $"Hi {name.Content}!" });
                output.Add(new PageLine() { Type = "text", Data = $"We think your age is {age.Content}" });
                output.Add(new PageLine() { Type = "break", Data = "" });
                output.Add(new PageLine() { Type = "break", Data = "" });
            }

            // Always add the form for the user to submit their age
            output.Add(new PageLine() { Type = "text", Data = "Enter your name, and we'll guess your age." });
            output.Add(new PageLine() { Type = "textInput", Data = "Name" });
            output.Add(new PageLine() { Type = "break", Data = "" });
            output.Add(new PageLine() { Type = "button", Data = "Guess" });

            Console.WriteLine($"[{nameof(PageCreator)}] Outputting data:\r\n===========\r\n{output}\r\n===========\r\n");

            return output;
        }

        private static string PageLinesToJsonString(List<PageLine> pageLines)
        {
            string output = "[";
            bool isFirstLine = true;
            foreach (var line in pageLines)
            {
                if (!isFirstLine)
                {
                    output += ", ";
                }

                output += line.ToString();

                isFirstLine = false;
            }
            output += "]";

            return output;
        }

        private static string GetErrorString(ErrorTypes error)
        {
            // TODO: give an error string for each error message.
            // For now, just return the ErrorType
            return error.ToString();
        }
    }
}
