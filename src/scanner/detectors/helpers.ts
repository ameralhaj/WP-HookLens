export function parseStringLiteral(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  const match = trimmed.match(/^(['"])(.*?)\1$/s);
  return match?.[2];
}

export function parseNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : undefined;
}

export interface ParsedCallback {
  callback?: string;
  className?: string;
  methodName?: string;
}

export function parseCallback(value: string | undefined): ParsedCallback {
  if (!value) {
    return {};
  }

  const stringCallback = parseStringLiteral(value);
  if (stringCallback) {
    return { callback: stringCallback };
  }

  const trimmed = value.trim();
  const arrayCallback = parseArrayCallback(trimmed);
  if (arrayCallback) {
    return arrayCallback;
  }

  if (trimmed.startsWith("function") || trimmed.startsWith("static function") || trimmed.startsWith("fn")) {
    return { callback: "closure" };
  }

  return trimmed ? { callback: trimmed } : {};
}

function parseArrayCallback(value: string): ParsedCallback | undefined {
  const match = value.match(/^\[\s*([^,\]]+)\s*,\s*(['"])(.*?)\2\s*\]$/s);
  if (!match) {
    return undefined;
  }

  const owner = match[1].trim();
  const methodName = match[3].trim();

  return {
    callback: `${owner}::${methodName}`,
    className: owner === "$this" ? undefined : owner.replace(/^['"]|['"]$/g, ""),
    methodName
  };
}
