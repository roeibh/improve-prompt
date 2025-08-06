#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

function setupImprovePrompt() {
  const homeDir = os.homedir();
  const configDir = path.join(homeDir, ".improve-prompt");

  // Create config directory if it doesn't exist
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log("📁 Created ~/.improve-prompt/ directory");
  }

  // Copy .env template if it doesn't exist
  const envFile = path.join(configDir, ".env");
  if (!fs.existsSync(envFile)) {
    const envTemplate = path.join(__dirname, "..", "dist", "templates", "env.template");
    if (fs.existsSync(envTemplate)) {
      fs.copyFileSync(envTemplate, envFile);
      console.log("📝 Created ~/.improve-prompt/.env");
    }
  }

  // Copy system.md if it doesn't exist
  const systemFile = path.join(configDir, "system.md");
  if (!fs.existsSync(systemFile)) {
    const systemTemplate = path.join(__dirname, "..", "dist", "templates", "system.md");
    if (fs.existsSync(systemTemplate)) {
      fs.copyFileSync(systemTemplate, systemFile);
      console.log("🎯 Created ~/.improve-prompt/system.md");
    }
  }

  console.log('✅ improve-prompt setup complete! Run "improve-prompt setup" to configure your API key.');
}

// Only run if this is being executed directly (not required)
if (require.main === module) {
  setupImprovePrompt();
}
