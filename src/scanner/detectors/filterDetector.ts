import type { HookItem } from "../../types/HookItem.js";
import type { ParsedPhpCall } from "../phpParser.js";
import { createHookId } from "../../utils/createHookId.js";
import { parseCallback, parseNumber, parseStringLiteral } from "./helpers.js";

export function detectFilter(call: ParsedPhpCall, file: string): HookItem | null {
  if (call.functionName !== "add_filter") {
    return null;
  }

  const name = parseStringLiteral(call.args[0]);
  if (!name) {
    return null;
  }

  const callback = parseCallback(call.args[1]);
  const hook: Omit<HookItem, "id"> = {
    type: "add_filter",
    name,
    callback: callback.callback,
    priority: parseNumber(call.args[2]) ?? 10,
    acceptedArgs: parseNumber(call.args[3]) ?? 1,
    file,
    line: call.line,
    column: call.column,
    raw: call.raw,
    className: callback.className,
    methodName: callback.methodName
  };

  return { id: createHookId(hook), ...hook };
}
