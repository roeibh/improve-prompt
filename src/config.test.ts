import * as fs from "fs";
import * as os from "os";

jest.mock("fs");
jest.mock("os");
jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

import { Config, loadConfig, saveConfig } from "./config";
import { config as loadDotenv } from "dotenv";

const mockFs = fs as jest.Mocked<typeof fs>;
const mockOs = os as jest.Mocked<typeof os>;
const mockLoadDotenv = loadDotenv as jest.MockedFunction<typeof loadDotenv>;

describe("Config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOs.homedir.mockReturnValue("/home/user");
  });

  it("loads config when .env file exists", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockLoadDotenv.mockReturnValue({
      parsed: {
        API_KEY: "sk-test",
        BASE_URL: "https://api.openai.com/v1",
        MODEL: "gpt-4o"
      }
    });

    expect(loadConfig()).toEqual({
      apiKey: "sk-test",
      baseUrl: "https://api.openai.com/v1",
      model: "gpt-4o"
    });
  });

  it("returns null when file does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);
    expect(loadConfig()).toBeNull();
  });

  it("returns null when API_KEY is missing", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockLoadDotenv.mockReturnValue({
      parsed: {
        BASE_URL: "https://api.openai.com/v1"
      }
    });

    expect(loadConfig()).toBeNull();
  });

  it("saves config to .env file", () => {
    mockFs.existsSync.mockReturnValue(true);
    const config: Config = { apiKey: "sk-test", baseUrl: "https://api.openai.com/v1", model: "gpt-4o" };
    saveConfig(config);

    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      "/home/user/.improve-prompt/.env",
      expect.stringContaining("API_KEY=sk-test")
    );
  });
});
