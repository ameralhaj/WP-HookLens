import { readdir } from "node:fs/promises";
import path from "node:path";

const ignoredDirectories = new Set([
  "node_modules",
  "vendor",
  ".git",
  "dist",
  "build",
  "coverage",
  ".cache"
]);

export async function walkPhpFiles(rootPath: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(currentPath: string): Promise<void> {
    const entries = await readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) {
          await walk(entryPath);
        }
        continue;
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".php")) {
        files.push(entryPath);
      }
    }
  }

  await walk(rootPath);
  return files.sort();
}
