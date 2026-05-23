import { exportJsonReport } from "../../exporters/jsonExporter.js";
import { exportMarkdownReport } from "../../exporters/markdownExporter.js";
import { scanProject } from "../../scanner/scanProject.js";

export interface ScanCommandOptions {
  targetPath: string;
  out?: string;
  markdown?: string;
  pretty: boolean;
}

export async function runScanCommand(options: ScanCommandOptions): Promise<void> {
  const report = await scanProject(options.targetPath);

  console.log("WP HookLens scan completed");
  console.log("");
  console.log(`Files scanned: ${report.totalFiles}`);
  console.log(`Hooks found: ${report.totalHooks}`);

  if (options.out || options.markdown) {
    console.log("");
  }

  if (options.out) {
    await exportJsonReport(report, options.out, options.pretty);
    console.log(`JSON report saved to: ${options.out}`);
  }

  if (options.markdown) {
    await exportMarkdownReport(report, options.markdown);
    console.log(`Markdown report saved to: ${options.markdown}`);
  }

  if (!options.out && !options.markdown) {
    console.log("");
    console.log(JSON.stringify(report, null, options.pretty ? 2 : 0));
  }
}
