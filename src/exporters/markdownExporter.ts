import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { HookItem } from "../types/HookItem.js";
import type { ScanReport } from "../types/ScanReport.js";

export async function exportMarkdownReport(report: ScanReport, outputPath: string): Promise<void> {
  const resolvedOutputPath = path.resolve(outputPath);
  await mkdir(path.dirname(resolvedOutputPath), { recursive: true });
  await writeFile(resolvedOutputPath, renderMarkdownReport(report), "utf8");
}

function renderMarkdownReport(report: ScanReport): string {
  const lines = [
    "# WP HookLens Report",
    "",
    `Project: ${report.projectName}  `,
    `Scanned at: ${report.scannedAt}  `,
    `Root path: ${report.rootPath}  `,
    `Total files: ${report.totalFiles}  `,
    `Total hooks: ${report.totalHooks}  `,
    "",
    "## Summary",
    "",
    "| Type | Count |",
    "|---|---:|",
    `| Actions | ${report.stats.actions} |`,
    `| Filters | ${report.stats.filters} |`,
    `| do_action | ${report.stats.doActions} |`,
    `| apply_filters | ${report.stats.applyFilters} |`,
    `| Shortcodes | ${report.stats.shortcodes} |`,
    `| REST Routes | ${report.stats.restRoutes} |`,
    "",
    "## Hooks",
    ""
  ];

  for (const hook of report.hooks) {
    lines.push(...renderHook(hook), "");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function renderHook(hook: HookItem): string[] {
  const lines = [
    `### ${hook.type}: ${hook.name}`,
    "",
    `- Callback: ${hook.callback ?? "N/A"}`,
    `- File: ${hook.file}`,
    `- Line: ${hook.line}`
  ];

  if (hook.column) {
    lines.push(`- Column: ${hook.column}`);
  }

  if (hook.priority !== undefined) {
    lines.push(`- Priority: ${hook.priority}`);
  }

  if (hook.acceptedArgs !== undefined) {
    lines.push(`- Accepted args: ${hook.acceptedArgs}`);
  }

  if (hook.methodName) {
    lines.push(`- Method: ${hook.methodName}`);
  }

  lines.push("", "```php", hook.raw, "```");
  return lines;
}
