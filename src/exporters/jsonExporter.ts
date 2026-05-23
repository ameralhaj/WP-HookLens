import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ScanReport } from "../types/ScanReport.js";

export async function exportJsonReport(report: ScanReport, outputPath: string, pretty = false): Promise<void> {
  const resolvedOutputPath = path.resolve(outputPath);
  await mkdir(path.dirname(resolvedOutputPath), { recursive: true });
  await writeFile(resolvedOutputPath, JSON.stringify(report, null, pretty ? 2 : 0), "utf8");
}
