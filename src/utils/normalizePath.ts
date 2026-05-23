import path from "node:path";

export function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

export function toRelativePath(rootPath: string, filePath: string): string {
  return normalizePath(path.relative(rootPath, filePath));
}
