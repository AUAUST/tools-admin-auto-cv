import { getDocumentConfig } from "../utils/config";
import { mm } from "../utils/units";

export function Page() {
  const config = getDocumentConfig();

  return (
    <div
      style={{
        width: mm(config.dimensions.width),
        height: mm(config.dimensions.height),
        "padding-left": mm(config.margins.left),
        "padding-right": mm(config.margins.right),
        "padding-top": mm(config.margins.top),
        "padding-bottom": mm(config.margins.bottom),
        background: "white",
      }}
    >
      <div style={{ border: "1px solid black", height: "100%" }}>y</div>
    </div>
  );
}
