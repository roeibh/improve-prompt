import { loadSystemPrompt } from "./config";

export function improvePrompt(userPrompt: string): string {
  const systemPrompt = loadSystemPrompt();
  if (!systemPrompt) {
    throw new Error(`System prompt not found. Please run: improve-prompt setup`);
  }
  return `${systemPrompt}\n\n${userPrompt}`;
}
