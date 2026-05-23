import { stat } from "node:fs/promises";
import path from "node:path";
import type { ScanReport } from "../types/ScanReport.js";
import { walkPhpFiles } from "../utils/fileWalker.js";
import { toRelativePath } from "../utils/normalizePath.js";
import { scanFile } from "./scanFile.js";

export async function scanProject(targetPath: string): Promise<ScanReport> {
  const rootPath = path.resolve(targetPath);
  const rootStats = await stat(rootPath).catch(() => null);

  if (!rootStats || !rootStats.isDirectory()) {
    throw new Error(`Scan target does not exist or is not a directory: ${targetPath}`);
  }

  const phpFiles = await walkPhpFiles(rootPath);
  const hooks = (
    await Promise.all(
      phpFiles.map((filePath) => scanFile(filePath, toRelativePath(rootPath, filePath)))
    )
  ).flat();

  return {
    projectName: path.basename(rootPath),
    scannedAt: new Date().toISOString(),
    rootPath,
    totalFiles: phpFiles.length,
    totalHooks: hooks.length,
    hooks,
    stats: {
      actions: hooks.filter((hook) => hook.type === "add_action").length,
      filters: hooks.filter((hook) => hook.type === "add_filter").length,
      doActions: hooks.filter((hook) => hook.type === "do_action").length,
      applyFilters: hooks.filter((hook) => hook.type === "apply_filters").length,
      shortcodes: hooks.filter((hook) => hook.type === "shortcode").length,
      restRoutes: hooks.filter((hook) => hook.type === "rest_route").length
    }
  };
}
