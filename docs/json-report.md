# JSON Report

The JSON report is intended for tools, dashboards, pull request checks, and future UI workflows.

```ts
type HookType =
  | "add_action"
  | "add_filter"
  | "do_action"
  | "apply_filters"
  | "shortcode"
  | "rest_route";
```

Each hook item includes the detected type, hook name, optional callback metadata, relative file path, source location, and raw PHP call.

See [`reports/hooklens-report.json`](../reports/hooklens-report.json) for an example.
