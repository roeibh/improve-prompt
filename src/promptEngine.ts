import * as fs from "fs";
import * as path from "path";

export function loadSystemPrompt(): string {
  const systemPromptPath = path.join(process.cwd(), "system.md");
  return fs.readFileSync(systemPromptPath, "utf-8");
}

export function improvePrompt(userPrompt: string): string {
  const systemPrompt = loadSystemPrompt();
  return `${systemPrompt}\n\n${userPrompt}`;
}
