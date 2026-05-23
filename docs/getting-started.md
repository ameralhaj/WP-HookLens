# Getting Started

WP HookLens scans WordPress plugins and themes for common extension points and exports reports that can be used in audits, documentation, and release reviews.

## Requirements

- Node.js 18 or newer
- npm

## Install

```bash
npm install
```

## Run the sample scan

```bash
npm run dev -- scan ./examples/sample-plugin --out ./reports/hooklens-report.json --markdown ./reports/hooklens-report.md --pretty
```

This scans the sample plugin and writes both JSON and Markdown reports.

## Build the CLI

```bash
npm run build
```

## Public demo

The public demo is available at [https://wp-hooklens.vercel.app](https://wp-hooklens.vercel.app).
