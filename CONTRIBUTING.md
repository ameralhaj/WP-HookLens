# Contributing

WP HookLens welcomes bug reports, feature requests, documentation improvements, and focused pull requests.

## Before you start

- Open an issue for larger changes.
- Keep detector changes small and covered by examples.
- Preserve the existing CLI command behavior.

## Local checks

```bash
npm install
npm run build
npm run dev -- scan ./examples/sample-plugin --out ./reports/hooklens-report.json --markdown ./reports/hooklens-report.md --pretty
```

## Pull requests

Please include:

- A clear description of the change
- Any new detection examples
- Notes about limitations or follow-up work
