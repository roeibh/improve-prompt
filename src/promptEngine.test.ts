import { improvePrompt } from "./promptEngine";
import { loadSystemPrompt } from "./config";

jest.mock("./config");
const mockLoadSystemPrompt = loadSystemPrompt as jest.MockedFunction<typeof loadSystemPrompt>;

describe("PromptEngine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("combines system and user prompts", () => {
    mockLoadSystemPrompt.mockReturnValue("SYSTEM");

    const result = improvePrompt("USER");

    expect(result).toBe("SYSTEM\n\nUSER");
  });

  it("throws error when system prompt not found", () => {
    mockLoadSystemPrompt.mockReturnValue(null);

    expect(() => improvePrompt("USER")).toThrow("System prompt not found. Please run: improve-prompt setup");
  });
});
