import type { HookItem } from "./HookItem.js";

export interface ScanReport {
  projectName: string;
  scannedAt: string;
  rootPath: string;
  totalFiles: number;
  totalHooks: number;
  hooks: HookItem[];
  stats: {
    actions: number;
    filters: number;
    doActions: number;
    applyFilters: number;
    shortcodes: number;
    restRoutes: number;
  };
}
