import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export interface Config {
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

function getConfigFile() {
  return path.join(os.homedir(), ".improve-prompt");
}

export function loadConfig(): Config | null {
  try {
    const configFile = getConfigFile();
    if (fs.existsSync(configFile)) {
      return JSON.parse(fs.readFileSync(configFile, "utf-8"));
    }
  } catch {
    // ignore errors, return null
  }
  return null;
}

export function saveConfig(config: Config): void {
  const configFile = getConfigFile();
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}
