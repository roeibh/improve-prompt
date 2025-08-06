import * as fs from "fs";
import { improvePrompt, loadSystemPrompt } from "./promptEngine";

jest.mock("fs");
const mockFs = fs as jest.Mocked<typeof fs>;

describe("PromptEngine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads system prompt from file", () => {
    mockFs.readFileSync.mockReturnValue("system prompt content");

    const result = loadSystemPrompt();

    expect(result).toBe("system prompt content");
    expect(mockFs.readFileSync).toHaveBeenCalledWith(expect.stringContaining("system.md"), "utf-8");
  });

  it("combines system and user prompts", () => {
    mockFs.readFileSync.mockReturnValue("SYSTEM");

    const result = improvePrompt("USER");

    expect(result).toBe("SYSTEM\n\nUSER");
  });
});
