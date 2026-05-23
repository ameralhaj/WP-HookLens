import type { HookItem } from "../../types/HookItem.js";
import type { ParsedPhpCall } from "../phpParser.js";
import { createHookId } from "../../utils/createHookId.js";
import { parseCallback, parseStringLiteral } from "./helpers.js";

export function detectRestRoute(call: ParsedPhpCall, file: string): HookItem | null {
  if (call.functionName !== "register_rest_route") {
    return null;
  }

  const namespace = parseStringLiteral(call.args[0]);
  const route = parseStringLiteral(call.args[1]);

  if (!namespace || !route) {
    return null;
  }

  const callback = parseRestCallback(call.args[2]);
  const hook: Omit<HookItem, "id"> = {
    type: "rest_route",
    name: `${namespace.replace(/\/+$/, "")}/${route.replace(/^\/+/, "")}`,
    callback: callback.callback,
    file,
    line: call.line,
    column: call.column,
    raw: call.raw,
    namespace,
    className: callback.className,
    methodName: callback.methodName
  };

  return { id: createHookId(hook), ...hook };
}

function parseRestCallback(optionsArg: string | undefined): ReturnType<typeof parseCallback> {
  if (!optionsArg) {
    return {};
  }

  const callbackMatch = optionsArg.match(/['"]callback['"]\s*=>\s*(\[[^\]]+\]|(['"]).*?\2)/s);
  return parseCallback(callbackMatch?.[1]);
}
