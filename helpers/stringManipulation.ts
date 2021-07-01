export function trimText(text = "", maxLength = 21): string {
  if (!text) text = "";
  if (text.length < maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function capitalize(text = ""): string {
  if (!text || typeof text !== "string") return "";
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeEachWordInSentence(
  text: string,
  seperator = " "
): string {
  return text
    .split(seperator)
    .map((word) => capitalize(word))
    .join(seperator);
}



export function convertParamsToString(
  url: string,
  urlVariables: Record<string, string> = {}
): string {
  let finalURL = url;

  for (const [key, value] of Object.entries(urlVariables)) {
    finalURL = finalURL.replace(`:${key}`, value);
  }

  return finalURL;
}
