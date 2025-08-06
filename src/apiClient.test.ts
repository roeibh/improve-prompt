import { callApi } from "./apiClient";
import { Config } from "./config";

// Mock OpenAI
jest.mock("openai");
import OpenAI from "openai";

const mockOpenAI = OpenAI as jest.MockedClass<typeof OpenAI>;

describe("ApiClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls OpenAI API with correct parameters", async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [{ message: { content: "improved prompt" } }]
    });

    mockOpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    } as any));

    const config: Config = { apiKey: "sk-test" };
    const result = await callApi("test prompt", config);

    expect(result).toBe("improved prompt");
    expect(mockOpenAI).toHaveBeenCalledWith({
      apiKey: "sk-test",
      baseURL: undefined,
    });
    expect(mockCreate).toHaveBeenCalledWith({
      model: "gpt-4",
      messages: [{ role: "user", content: "test prompt" }],
    });
  });
});