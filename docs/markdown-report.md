# Markdown Report

Markdown reports are designed for human review in pull requests, issue comments, audit handoffs, and project documentation.

Generate one with:

```bash
npm run dev -- scan ./examples/sample-plugin --markdown ./reports/hooklens-report.md
```

The report includes:

- Project metadata
- Summary counts
- One section per detected hook
- Raw PHP snippets

See [`reports/hooklens-report.md`](../reports/hooklens-report.md) for an example.
