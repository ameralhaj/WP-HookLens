# CLI Reference

## scan

```bash
wp-hooklens scan ./path/to/plugin
```

Scans every `.php` file in the target directory.

## Options

| Option | Description |
|---|---|
| `--out <path>` | Write a JSON report to the selected path. |
| `--markdown <path>` | Write a Markdown report to the selected path. |
| `--pretty` | Format JSON output with indentation. |

## Ignored directories

- `node_modules`
- `vendor`
- `.git`
- `dist`
- `build`
- `coverage`
- `.cache`

## Local development

```bash
npm run dev -- scan ./examples/sample-plugin --out ./reports/hooklens-report.json --markdown ./reports/hooklens-report.md --pretty
```
