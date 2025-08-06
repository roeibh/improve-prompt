#!/usr/bin/env node

import * as readline from "readline";
import { callApi } from "./apiClient";
import { createProgram } from "./cli";
import { loadConfig, saveConfig } from "./config";
import { improvePrompt } from "./promptEngine";

async function readStdin(): Promise<string> {
  let input = "";
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  return input.trim();
}

async function setupConfig() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  try {
    console.log("🚀 Setting up improve-prompt configuration...\n");

    const apiKey = await question("Enter your API key: ");
    if (!apiKey.trim()) {
      console.error("API key is required");
      process.exit(1);
    }

    const baseUrl = await question("Enter base URL (default: https://api.openai.com/v1): ");
    const model = await question("Enter model (default: gpt-4.1): ");

    const config = {
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim() || "https://api.openai.com/v1",
      model: model.trim() || "gpt-4.1",
    };

    saveConfig(config);
    console.log("\n✅ Configuration saved successfully!");
    console.log("📁 Config files created in ~/.improve-prompt/");
    console.log("📝 You can customize the system prompt by editing ~/.improve-prompt/system.md");
  } finally {
    rl.close();
  }
}

async function main() {
  const program = createProgram();

  program.command("setup").description("Setup API key and configuration").action(setupConfig);

  program.argument("[prompt]", "prompt to improve").action(async (prompt?: string) => {
    const config = loadConfig();
    if (!config?.apiKey) {
      console.error("❌ No API key configured.");
      console.error("");
      console.error("To get started, run the setup command:");
      console.error("  improve-prompt setup");
      console.error("");
      console.error("This will prompt you to enter your API key and configure the tool.");
      process.exit(1);
    }

    const userPrompt = prompt || (await readStdin());
    if (!userPrompt) {
      console.error("No prompt provided");
      process.exit(1);
    }

    const combinedPrompt = improvePrompt(userPrompt);
    const result = await callApi(combinedPrompt, config);
    console.log(result);
  });

  await program.parseAsync();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
