# improve-prompt

A command-line tool to enhance your AI prompts using expert prompt engineering knowledge.

## What it does

`improve-prompt` takes your prompts and enhances them by prepending expert prompt engineering guidance, helping you get better results from AI models like GPT-4, Claude, and others.

The tool combines your input with a comprehensive system prompt that includes proven strategies and tactics for getting better results from large language models.

## Installation

Install globally via npm:

```bash
npm install -g improve-prompt
```

## Setup

Before using the tool, you need to configure your API key:

```bash
improve-prompt setup
```

This will prompt you to enter:
- **API key**: Your OpenAI API key (or compatible provider key)
- **Base URL**: API endpoint (default: https://api.openai.com/v1)
- **Model**: Model to use (default: gpt-4.1)

The configuration is saved in the `~/.improve-prompt/` folder:
- `~/.improve-prompt/.env` - Contains your API configuration
- `~/.improve-prompt/system.md` - Contains the system prompt (customizable)

#### Configuration File Format

Your `.env` file will look like this:
```bash
# improve-prompt configuration
# Your API key for the AI service
API_KEY=your-api-key-here

# Base URL for the API (default: https://api.openai.com/v1)
BASE_URL=https://api.openai.com/v1

# Model to use (default: gpt-4.1)
MODEL=gpt-4o
```

### Supported Providers

The tool works with any OpenAI-compatible API:
- **OpenAI**: Use default base URL
- **Anthropic**: Set base URL to `https://api.anthropic.com`
- **OpenRouter**: Set base URL to `https://openrouter.ai/api/v1`
- **Local models**: Set base URL to your local endpoint

### Customizing the System Prompt

You can customize the prompt engineering behavior by editing the system prompt:

```bash
# Edit the system prompt to customize how prompts are improved
nano ~/.improve-prompt/system.md
```

The first time you run the tool, it will copy the default comprehensive system prompt to this location for easy customization.

**Note**: If you're upgrading from an older version, the tool will automatically migrate your existing `~/.improve-prompt` file to the new folder structure.

## Usage

### Quick Setup with Alias

For faster access, you can create an alias in your shell:

```bash
# Add to your ~/.zshrc or ~/.bashrc
alias improve="pbpaste | improve-prompt | pbcopy && echo '✨ Improved prompt copied to clipboard'"
```

Then simply:
```bash
improve  # Improves clipboard content and copies result back
```

### Pipe content from clipboard

```bash
pbpaste | improve-prompt
```

### Pass prompt directly

```bash
improve-prompt "Write a function to calculate fibonacci numbers"
```

### Pipe from file

```bash
cat my-prompt.txt | improve-prompt
```

### Save output

```bash
echo "My prompt" | improve-prompt > improved-prompt.txt
```

## Examples

**Input:**
```bash
echo "write code for user login" | improve-prompt
```

**Output:**
The tool will enhance your prompt with expert guidance and return an improved version that includes:
- Clear instructions for the AI
- Context about best practices
- Specific requirements for code quality
- Examples and formatting guidelines

## How it works

1. **System Prompt**: The tool uses a comprehensive system prompt based on OpenAI's prompt engineering best practices
2. **Combination**: Your input prompt is appended to the system prompt
3. **API Call**: The combined prompt is sent to your configured AI model
4. **Clean Output**: Only the improved prompt is returned

## Help

```bash
improve-prompt --help          # Show general help
improve-prompt setup --help    # Show setup help
```

## Troubleshooting

### No API key configured
If you see this error:
```
❌ No API key configured.

To get started, run the setup command:
  improve-prompt setup
```

Run the setup command and enter your API key.

### API errors
- Verify your API key is correct
- Check your internet connection
- Ensure you have sufficient API credits
- Verify the base URL for your provider

## Attribution

Original system prompt created by [@ksylvan](https://github.com/ksylvan).
