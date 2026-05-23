#!/usr/bin/env node
import { runScanCommand } from "./commands/scan.js";

interface ParsedArgs {
  command?: string;
  targetPath?: string;
  out?: string;
  markdown?: string;
  pretty: boolean;
}

async function main(argv: string[]): Promise<void> {
  const args = parseArgs(argv);

  if (args.command !== "scan" || !args.targetPath) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  await runScanCommand({
    targetPath: args.targetPath,
    out: args.out,
    markdown: args.markdown,
    pretty: args.pretty
  });
}

function parseArgs(argv: string[]): ParsedArgs {
  const [command, targetPath, ...rest] = argv;
  const parsed: ParsedArgs = {
    command,
    targetPath,
    pretty: false
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];

    if (arg === "--pretty") {
      parsed.pretty = true;
      continue;
    }

    if (arg === "--out") {
      const outputPath = rest[index + 1];
      if (!outputPath || outputPath.startsWith("--")) {
        throw new Error("--out requires a file path");
      }
      parsed.out = outputPath;
      index += 1;
      continue;
    }

    if (arg === "--markdown") {
      const outputPath = rest[index + 1];
      if (!outputPath || outputPath.startsWith("--")) {
        throw new Error("--markdown requires a file path");
      }
      parsed.markdown = outputPath;
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return parsed;
}

function printHelp(): void {
  console.log("Usage:");
  console.log("  wp-hooklens scan ./path/to/plugin");
  console.log("  wp-hooklens scan ./path/to/plugin --out ./reports/report.json");
  console.log("  wp-hooklens scan ./path/to/plugin --out ./reports/report.json --markdown ./reports/report.md --pretty");
}

main(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`WP HookLens error: ${message}`);
  process.exitCode = 1;
});
