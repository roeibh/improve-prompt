import { createProgram } from "./cli";

describe("CLI", () => {
  it("creates program with correct name and version", () => {
    const program = createProgram();

    expect(program.name()).toBe("improve-prompt");
    expect(program.version()).toBe("1.0.0");
  });
});
