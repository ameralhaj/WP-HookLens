import type { HookItem } from "../../types/HookItem.js";
import { createHookId } from "../../utils/createHookId.js";
import type { ParsedPhpCall } from "../phpParser.js";
import { parseStringLiteral } from "./helpers.js";

export function detectApplyFilters(call: ParsedPhpCall, file: string): HookItem | null {
  if (call.functionName !== "apply_filters") {
    return null;
  }

  const name = parseStringLiteral(call.args[0]);
  if (!name) {
    return null;
  }

  const hook: Omit<HookItem, "id"> = {
    type: "apply_filters",
    name,
    file,
    line: call.line,
    column: call.column,
    raw: call.raw
  };

  return { id: createHookId(hook), ...hook };
}
