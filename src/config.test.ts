import * as fs from "fs";
import * as os from "os";

jest.mock("fs");
jest.mock("os");

import { Config, loadConfig, saveConfig } from "./config";

const mockFs = fs as jest.Mocked<typeof fs>;
const mockOs = os as jest.Mocked<typeof os>;

describe("Config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOs.homedir.mockReturnValue("/home/user");
  });

  it("loads config when file exists", () => {
    const config = { apiKey: "sk-test" };
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(config));

    expect(loadConfig()).toEqual(config);
  });

  it("returns null when file does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);
    expect(loadConfig()).toBeNull();
  });

  it("saves config to file", () => {
    const config: Config = { apiKey: "sk-test" };
    saveConfig(config);

    expect(mockFs.writeFileSync).toHaveBeenCalledWith("/home/user/.improve-prompt", JSON.stringify(config, null, 2));
  });
});
