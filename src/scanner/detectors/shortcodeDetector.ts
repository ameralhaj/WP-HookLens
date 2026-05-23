import type { HookItem } from "../../types/HookItem.js";
import type { ParsedPhpCall } from "../phpParser.js";
import { createHookId } from "../../utils/createHookId.js";
import { parseCallback, parseStringLiteral } from "./helpers.js";

export function detectShortcode(call: ParsedPhpCall, file: string): HookItem | null {
  if (call.functionName !== "add_shortcode") {
    return null;
  }

  const name = parseStringLiteral(call.args[0]);
  if (!name) {
    return null;
  }

  const callback = parseCallback(call.args[1]);
  const hook: Omit<HookItem, "id"> = {
    type: "shortcode",
    name,
    callback: callback.callback,
    file,
    line: call.line,
    column: call.column,
    raw: call.raw,
    className: callback.className,
    methodName: callback.methodName
  };

  return { id: createHookId(hook), ...hook };
}
