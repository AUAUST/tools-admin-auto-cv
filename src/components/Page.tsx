import type { ParentProps } from "solid-js";
import { getDocumentConfig } from "../utils/config";
import { mm } from "../utils/units";

export function Page(props: ParentProps) {
  const config = getDocumentConfig();

  return (
    <div
      class="bg-white"
      style={{
        width: mm(config.dimensions.width),
        height: mm(config.dimensions.height),
        "padding-left": mm(config.margins.left),
        "padding-right": mm(config.margins.right),
        "padding-top": mm(config.margins.top),
        "padding-bottom": mm(config.margins.bottom),
      }}
    >
      {props.children}
    </div>
  );
}
