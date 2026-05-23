import crypto from "node:crypto";
import type { HookItem } from "../types/HookItem.js";

export function createHookId(input: Omit<HookItem, "id">): string {
  const hash = crypto
    .createHash("sha1")
    .update(`${input.type}:${input.name}:${input.file}:${input.line}:${input.column ?? ""}:${input.callback ?? ""}`)
    .digest("hex")
    .slice(0, 12);

  return `${input.type}:${hash}`;
}
