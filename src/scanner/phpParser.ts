export interface ParsedPhpCall {
  functionName: string;
  args: string[];
  raw: string;
  line: number;
  column: number;
}

const supportedCalls = [
  "add_action",
  "add_filter",
  "do_action",
  "apply_filters",
  "add_shortcode",
  "register_rest_route"
];

export function parsePhpCalls(source: string): ParsedPhpCall[] {
  const calls: ParsedPhpCall[] = [];
  const pattern = /\b(add_action|add_filter|do_action|apply_filters|add_shortcode|register_rest_route)\s*\(/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    if (!supportedCalls.includes(match[1])) {
      continue;
    }

    const openParenIndex = source.indexOf("(", match.index);
    const endIndex = findCallEnd(source, openParenIndex);

    if (endIndex === -1) {
      continue;
    }

    const rawEndIndex = includeTrailingSemicolon(source, endIndex);
    const raw = source.slice(match.index, rawEndIndex + 1).trim();
    const argsSource = source.slice(openParenIndex + 1, endIndex);
    const location = getLocation(source, match.index);

    calls.push({
      functionName: match[1],
      args: splitTopLevelArgs(argsSource),
      raw,
      line: location.line,
      column: location.column
    });

    pattern.lastIndex = openParenIndex + 1;
  }

  return calls;
}

function includeTrailingSemicolon(source: string, closeParenIndex: number): number {
  let index = closeParenIndex + 1;

  while (/\s/.test(source[index] ?? "")) {
    index += 1;
  }

  return source[index] === ";" ? index : closeParenIndex;
}

function findCallEnd(source: string, openParenIndex: number): number {
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;
  let quote: "'" | "\"" | null = null;
  let escaped = false;

  for (let index = openParenIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === "\"") {
      quote = char;
      continue;
    }

    if (char === "(") parenDepth += 1;
    if (char === ")") parenDepth -= 1;
    if (char === "[") bracketDepth += 1;
    if (char === "]") bracketDepth -= 1;
    if (char === "{") braceDepth += 1;
    if (char === "}") braceDepth -= 1;

    if (parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
      return index;
    }
  }

  return -1;
}

export function splitTopLevelArgs(argsSource: string): string[] {
  const args: string[] = [];
  let start = 0;
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;
  let quote: "'" | "\"" | null = null;
  let escaped = false;

  for (let index = 0; index < argsSource.length; index += 1) {
    const char = argsSource[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === "\"") {
      quote = char;
      continue;
    }

    if (char === "(") parenDepth += 1;
    if (char === ")") parenDepth -= 1;
    if (char === "[") bracketDepth += 1;
    if (char === "]") bracketDepth -= 1;
    if (char === "{") braceDepth += 1;
    if (char === "}") braceDepth -= 1;

    if (char === "," && parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
      args.push(argsSource.slice(start, index).trim());
      start = index + 1;
    }
  }

  const lastArg = argsSource.slice(start).trim();
  if (lastArg.length > 0) {
    args.push(lastArg);
  }

  return args;
}

function getLocation(source: string, index: number): { line: number; column: number } {
  const before = source.slice(0, index);
  const lines = before.split(/\r?\n/);

  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1
  };
}
