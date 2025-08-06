import * as fs from "fs";
import * as path from "path";

export function loadSystemPrompt(): string {
  // system.md is in the package root, not the user's current working directory
  const systemPromptPath = path.join(__dirname, "..", "system.md");
  return fs.readFileSync(systemPromptPath, "utf-8");
}

export function improvePrompt(userPrompt: string): string {
  const systemPrompt = loadSystemPrompt();
  return `${systemPrompt}\n\n${userPrompt}`;
}
