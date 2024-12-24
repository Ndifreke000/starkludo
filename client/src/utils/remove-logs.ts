import fs from 'fs';
import path from 'path';

// Get the base directory relative to the script's location
const baseDir = path.resolve(new URL(import.meta.url).pathname, '../');

// Function to recursively process directories
function processDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      // Process TypeScript files
      processFile(filePath);
    }
  });
}

// Function to remove console.log statements from a file
function processFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const updatedContent = fileContent.replace(/^\s*console\.log\(.*\);\s*$/gm, '');

  if (fileContent !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');

  }
}

// Start processing from the base directory
processDirectory(baseDir);