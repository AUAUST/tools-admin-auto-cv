import { cl } from "@auaust/g-class";
import { s } from "@auaust/primitive-kit";
import { min } from "@auaust/primitive-kit/numbers";
import { createSignal, For, onMount, type ParentProps } from "solid-js";
import { useFlags } from "../contexts/FlagsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getDocumentConfig } from "../utils/config";
import { t } from "../utils/label";
import { mm } from "../utils/units";

export function Document(props: ParentProps) {
  const config = getDocumentConfig();
  const language = useLanguage();
  const flags = useFlags();

  const [fit, setFit] = createSignal<"real" | "fit">("fit");
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

      <div class="print:hidden flex flex-col fixed top-4 left-4 gap-1">
        <button onClick={() => window.print()}>Print</button>

        <button
          onClick={() => setFit((fit) => (fit === "real" ? "fit" : "real"))}
        >
          {fit() === "real" ? "Fit to Page" : "Actual Size"}
        </button>

        <button onClick={() => language.setLanguage(language.nextLanguage)}>
          {t(language.nextLanguage)}
        </button>

        <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
          <legend>Flags</legend>

          <For each={flags.all}>
            {(flag) => (
              <label class="block">
                <input
                  type="checkbox"
                  checked={flags.isEnabled(flag)}
                  onChange={() => flags.toggle(flag)}
                  class="mr-2 "
                />
                {s(flag).splitWords().join(" ").toTitleCase().value}
              </label>
            )}
          </For>
        </fieldset>
      </div>
    </>
  );
}
