import { config as loadDotenv } from "dotenv";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export interface Config {
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

function getConfigDir(): string {
  return path.join(os.homedir(), ".improve-prompt");
}

function getConfigFile(): string {
  return path.join(getConfigDir(), ".env");
}

function getSystemPromptFile(): string {
  return path.join(getConfigDir(), "system.md");
}

function ensureConfigDir(): void {
  const configDir = getConfigDir();
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
}

function formatEnvContent(config: Config): string {
  const lines = [
    "# improve-prompt configuration",
    "# Your API key for the AI service",
    `API_KEY=${config.apiKey}`,
    "",
    "# Base URL for the API (default: https://api.openai.com/v1)",
    `BASE_URL=${config.baseUrl || "https://api.openai.com/v1"}`,
    "",
    "# Model to use (default: gpt-4.1)",
    `MODEL=${config.model || "gpt-4.1"}`,
    "",
  ];

  return lines.join("\n");
}

export function loadConfig(): Config | null {
  try {
    const configFile = getConfigFile();

    if (!fs.existsSync(configFile)) {
      return null;
    }

    // Load the .env file
    const result = loadDotenv({ path: configFile });

    if (result.error || !result.parsed || !result.parsed.API_KEY) {
      return null;
    }

    return {
      apiKey: result.parsed.API_KEY,
      baseUrl: result.parsed.BASE_URL,
      model: result.parsed.MODEL,
    };
  } catch {
    return null;
  }
}

export function saveConfig(config: Config): void {
  ensureConfigDir();
  const configFile = getConfigFile();
  const envContent = formatEnvContent(config);
  fs.writeFileSync(configFile, envContent);
}

export function loadSystemPrompt(): string | null {
  try {
    const systemPromptFile = getSystemPromptFile();
    if (fs.existsSync(systemPromptFile)) {
      return fs.readFileSync(systemPromptFile, "utf-8");
    }
  } catch {
    // ignore errors, return null
  }
  return null;
}
