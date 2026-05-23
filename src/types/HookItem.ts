export type HookType =
  | "add_action"
  | "add_filter"
  | "do_action"
  | "apply_filters"
  | "shortcode"
  | "rest_route";

export interface HookItem {
  id: string;
  type: HookType;
  name: string;
  callback?: string;
  priority?: number;
  acceptedArgs?: number;
  file: string;
  line: number;
  column?: number;
  raw: string;
  namespace?: string;
  className?: string;
  methodName?: string;
}
