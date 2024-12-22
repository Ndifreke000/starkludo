// File to remove logs from the project
import { readFile, writeFile, mkdir } from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

async function createBackup(filePath: string, content: string) {
    const backupDir = path.join(process.cwd(), 'backups', new Date().toISOString().split('T')[0]);
    const relativePath = path.relative(process.cwd(), filePath);
    const backupPath = path.join(backupDir, relativePath);
    
    // Create backup directory structure
    await mkdir(path.dirname(backupPath), { recursive: true });
    await writeFile(backupPath, content);
    return backupPath;
}

async function removeLogMessages() {
    // Focus on specific client-side directories
    const patterns = [
        'src/**/*.{ts,tsx}',
        'src/components/**/*.{ts,tsx}',
        'src/context/**/*.{ts,tsx}',
        'src/dojo/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/utils/**/*.{ts,tsx}',
    ];

    try {
        const files = await glob(patterns, {
            ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', 'backups/**']
        });

        let totalLogsRemoved = 0;
        const modifiedFiles = new Set<string>();
        const backupFiles = new Map<string, string>();

        for (const file of files) {
            const filePath = path.resolve(file);
            const content = await readFile(filePath, 'utf-8');

            // Patterns to match different types of console statements
            const logPatterns = [
                /console\s*\.\s*log\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*debug\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*info\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*warn\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*error\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*trace\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*dir\s*\([^)]*\)\s*;?/g,
                /console\s*\.\s*table\s*\([^)]*\)\s*;?/g,
                // Handle multi-line console statements
                /console\s*\.\s*log\s*\(\s*[\s\S]*?\)\s*;?/g,
                // Handle template literal logs
                /console\s*\.\s*log\s*\(`[\s\S]*?`\)\s*;?/g
            ];

            let modifiedContent = content;
            let fileModified = false;
            let logsInFile = 0;

            for (const pattern of logPatterns) {
                const matches = content.match(pattern);
                if (matches) {
                    logsInFile += matches.length;
                    modifiedContent = modifiedContent.replace(pattern, '');
                    fileModified = true;
                }
            }

            if (fileModified) {
                // Clean up empty lines and spacing
                modifiedContent = modifiedContent
                    .replace(/^\s*[\r\n]/gm, '\n')
                    .replace(/\n{3,}/g, '\n\n')
                    .replace(/^\s*$/gm, '');

                // Create backup before modifying
                const backupPath = await createBackup(filePath, content);
                backupFiles.set(file, backupPath);

                // Write changes
                await writeFile(filePath, modifiedContent);
                modifiedFiles.add(file);
                totalLogsRemoved += logsInFile;
            }
        }

        return {
            totalLogsRemoved,
            modifiedFiles: Array.from(modifiedFiles),
            backupFiles: Object.fromEntries(backupFiles)
        };
    } catch (error) {
        console.error('Error processing files:', error);
        throw error;
    }
}

// Execute the function
removeLogMessages()
    .then(({ totalLogsRemoved, modifiedFiles, backupFiles }) => {
        (`\nRemoved ${totalLogsRemoved} log messages from ${modifiedFiles.length} files`);
        ('\nModified files:');
        modifiedFiles.forEach(file => (`- ${file}`));
        ('\nBackups created in:', Object.values(backupFiles)[0]?.split('/backups/')[0] + '/backups/[date]');
    })
    .catch(error => {
        console.error('Failed to remove log messages:', error);
        process.exit(1);
    });