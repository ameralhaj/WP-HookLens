# WP HookLens

WP HookLens is an open source TypeScript CLI for scanning WordPress plugins and themes and detecting actions, filters, shortcodes, and REST API routes.

Public demo: [https://wp-hooklens.vercel.app](https://wp-hooklens.vercel.app)

## Features

- Scan WordPress plugins and themes recursively
- Ignore common dependency and build folders
- Detect `add_action()`
- Detect `add_filter()`
- Detect `do_action()`
- Detect `apply_filters()`
- Detect `add_shortcode()`
- Detect `register_rest_route()`
- Extract callback, priority, accepted args, file, line, column, and raw code
- Export JSON reports
- Export Markdown reports

## Installation

```bash
npm install
```

## CLI Usage

```bash
npm run dev -- scan ./examples/sample-plugin --out ./reports/hooklens-report.json --markdown ./reports/hooklens-report.md --pretty
```

After building:

```bash
npm run build
npm run start -- scan ./examples/sample-plugin --out ./reports/hooklens-report.json --markdown ./reports/hooklens-report.md --pretty
```

## Repository Structure

```text
src/       CLI, scanner, exporters, types, utilities
docs/      Project documentation
examples/  Sample WordPress plugin
reports/   Example JSON and Markdown reports
```

## Documentation

- [Getting started](./docs/getting-started.md)
- [CLI reference](./docs/cli.md)
- [JSON report](./docs/json-report.md)
- [Markdown report](./docs/markdown-report.md)
- [Roadmap](./docs/roadmap.md)
- [Contributing](./docs/contributing.md)

## Roadmap

- npm package publishing
- React + Tailwind report UI
- Graph view
- REST route security warnings
- Missing callback detection
- Namespace and class context extraction
- GitHub Action for report generation

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and open an issue before larger changes.

## License

MIT
