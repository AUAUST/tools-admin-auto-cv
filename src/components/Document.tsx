import { cl } from "@auaust/g-class";
import { min } from "@auaust/primitive-kit/numbers";
import { createSignal, onMount, type ParentProps } from "solid-js";
import { getDocumentConfig } from "../utils/config";
import { mm } from "../utils/units";

export function Document(props: ParentProps) {
  const config = getDocumentConfig();

  const [fit, setFit] = createSignal<"real" | "fit">("real");
  const [scale, setScale] = createSignal(1);

  let doc: HTMLDivElement = undefined!;

  const updateScale = () =>
    setScale(
      min(
        window.innerWidth / doc.offsetWidth,
        window.innerHeight / doc.offsetHeight
      )
    );

  window.addEventListener("resize", updateScale);

  onMount(() => setTimeout(() => updateScale()));

  return (
    <>
      <div
        class={cl("document", fit())}
        ref={doc}
        style={{
          "--scale": scale(),
        }}
      >
        <style>
          {`@page { size: ${mm(config.dimensions.width)} ${mm(
            config.dimensions.height
          )}; margin: 0; }`}
        </style>
        {props.children}
      </div>

      <div class="buttons">
        <button onClick={() => window.print()}>Print</button>
        <button
          onClick={() => setFit((fit) => (fit === "real" ? "fit" : "real"))}
        >
          {fit() === "real" ? "Fit to Page" : "Actual Size"}
        </button>
      </div>
    </>
  );
}
