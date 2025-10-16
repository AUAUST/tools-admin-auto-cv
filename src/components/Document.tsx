import type { ParentProps } from "solid-js";
import { getDocumentConfig } from "../utils/config";
import { mm } from "../utils/units";

export function Document(props: ParentProps) {
  const config = getDocumentConfig();

  return (
    <>
      <div class="document">
        <style>
          {`@page { size: ${mm(config.dimensions.width)} ${mm(
            config.dimensions.height
          )}; margin: 0; }`}
        </style>
        {props.children}
      </div>

      <button onClick={() => window.print()}>Print</button>
    </>
  );
}
