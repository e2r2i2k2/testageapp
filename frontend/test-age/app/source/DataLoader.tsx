import ContentLine from "../format/types";

const getAgeEndpoint = "http://127.0.0.1:3000/getage"
const getAgeEndpointVarMarker = "?name=";

const fakeApiResponse = true;

export async function getPageContent(name : string) : Promise<ContentLine[]>{

  if (fakeApiResponse){
    return test_fakeResponse(name);
  }

  try
  {
    let endpoint = getAgeEndpoint;
    if (name && name.length > 0){
      endpoint += getAgeEndpointVarMarker + encodeURIComponent(name);
    }

    console.log(`Calling into page content with endpoint: ${endpoint}`);

    const response = await fetch(endpoint);

    if (!response.ok) {
      console.error("getPageContent fetch failed:", response.status, response.statusText);
      return getLoadingError("Fetch failed with status " + response.status);
    }

    const jsonContent = await response.json();
    console.log("getPageContent response:", jsonContent);
    if (!jsonContent || !jsonContent.message) {
      return getLoadingError("Invalid content");
    }
    const messageArray = jsonContent?.message as ContentLine[];
    return messageArray;
  } 
  catch (error)
  {
    console.error("getPageContent error:", error);
    return getLoadingError(error as string);
  }
}
  
export function getLoadingError(error : string) : ContentLine[]
{
  let errorMsg = `{"message":[{"type": "text", "data": "Error loading content. Error: ${error}"}]}`;
  const parsed = JSON.parse(errorMsg);
  const messageArray = parsed.message;
  return messageArray as ContentLine[];
}

export default function test_fakeResponse(name : string) : ContentLine[]
{
  console.log(`TEST: === Using fake API response with name ${name}`);
  let testResponse = `{"message":[{"type": "heading", "data": "Amazing Age Guesser"}, {"type": "text", "data": "Enter your name, and we'll guess your age."}, {"type": "textInput", "data": "Name"}, {"type": "break", "data": ""}, {"type": "button", "data": "Guess"}]}`
  
  if (name && name.length > 0)
  {
    testResponse = `{"message":[{"type": "heading", "data": "Amazing Age Guesser"}, {"type": "text", "data": "Hi Tammy!"}, {"type": "text", "data": "We think your age is 48"}, {"type": "break", "data": ""}, {"type": "break", "data": ""}, {"type": "text", "data": "Enter your name, and we'll guess your age."}, {"type": "textInput", "data": "Name"}, {"type": "break", "data": ""}, {"type": "button", "data": "Guess"}]}`
  }

  const parsed = JSON.parse(testResponse);
  const messageArray = parsed.message;
  return messageArray as ContentLine[];
}