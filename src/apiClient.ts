import OpenAI from "openai";
import { Config } from "./config";

export async function callApi(prompt: string, config: Config): Promise<string> {
    const client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });

  const response = await client.chat.completions.create({
    model: config.model || "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content || "";
}
