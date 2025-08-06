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

  // Handle system.md - backup existing if changed, then copy new one
  const systemFile = path.join(configDir, "system.md");
  const systemTemplate = path.join(__dirname, "..", "dist", "templates", "system.md");
  
  if (fs.existsSync(systemTemplate)) {
    if (fs.existsSync(systemFile)) {
      // Check if the files are different
      const existingContent = fs.readFileSync(systemFile, "utf-8");
      const newContent = fs.readFileSync(systemTemplate, "utf-8");
      
      if (existingContent !== newContent) {
        // Backup the existing file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFile = path.join(configDir, `system.md.${timestamp}.backup`);
        fs.copyFileSync(systemFile, backupFile);
        console.log(`📋 Backed up existing system.md to system.md.${timestamp}.backup`);
        
        // Copy the new version
        fs.copyFileSync(systemTemplate, systemFile);
        console.log("🆕 Updated ~/.improve-prompt/system.md with latest version");
      }
    } else {
      // File doesn't exist, create it
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
