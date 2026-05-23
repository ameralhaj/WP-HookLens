import { readFile } from "node:fs/promises";
import type { HookItem } from "../types/HookItem.js";
import { parsePhpCalls } from "./phpParser.js";
import { detectAction } from "./detectors/actionDetector.js";
import { detectApplyFilters } from "./detectors/applyFiltersDetector.js";
import { detectDoAction } from "./detectors/doActionDetector.js";
import { detectFilter } from "./detectors/filterDetector.js";
import { detectShortcode } from "./detectors/shortcodeDetector.js";
import { detectRestRoute } from "./detectors/restRouteDetector.js";

export async function scanFile(filePath: string, relativeFilePath: string): Promise<HookItem[]> {
  const source = await readFile(filePath, "utf8");
  const calls = parsePhpCalls(source);
  const hooks: HookItem[] = [];

  for (const call of calls) {
    const hook =
      detectAction(call, relativeFilePath) ??
      detectFilter(call, relativeFilePath) ??
      detectDoAction(call, relativeFilePath) ??
      detectApplyFilters(call, relativeFilePath) ??
      detectShortcode(call, relativeFilePath) ??
      detectRestRoute(call, relativeFilePath);

    if (hook) {
      hooks.push(hook);
    }
  }

  return hooks;
}
