# Contributing

Thanks for considering a contribution to WP HookLens.

## Good first issues

- Add parser fixtures
- Improve Markdown report formatting
- Add detection for more WordPress APIs

## Development workflow

```bash
npm install
npm run build
```

Before opening a pull request, run the CLI against the sample plugin:

```bash
npm run dev -- scan ./examples/sample-plugin --out ./reports/hooklens-report.json --markdown ./reports/hooklens-report.md --pretty
```
