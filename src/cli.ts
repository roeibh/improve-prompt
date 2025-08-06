import { Command } from "commander";

export function createProgram(): Command {
  const program = new Command();
  
  program
    .name("improve-prompt")
    .description("CLI tool to improve AI prompts")
    .version("1.0.0");

  return program;
}