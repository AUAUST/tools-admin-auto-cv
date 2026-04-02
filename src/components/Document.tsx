import { cl } from "@auaust/g-class";
import { s } from "@auaust/primitive-kit";
import { min } from "@auaust/primitive-kit/numbers";
import {
  createEffect,
  createSignal,
  For,
  onMount,
  type ParentProps,
} from "solid-js";
import { useFlags } from "../contexts/FlagsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useResume } from "../contexts/ResumeContext";
import { getDocumentConfig } from "../utils/config";
import { label, t } from "../utils/label";
import { mm } from "../utils/units";

export function Document(props: ParentProps) {
  const config = getDocumentConfig();
  const language = useLanguage();
  const flags = useFlags();
  const resume = useResume();

  const [fit, setFit] = createSignal<"real" | "fit">("fit");
  const [scale, setScale] = createSignal(1);

  let doc: HTMLDivElement = undefined!;

  const updateScale = () =>
    setScale(
      min(
        window.innerWidth / doc.offsetWidth,
        window.innerHeight / doc.offsetHeight,
      ),
    );

  createEffect(
    () =>
      (document.title = label(config.title).replace(
        "{date}",
        new Date()
          .toLocaleDateString("fr", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join(""),
      )),
  );

  onMount(() => {
    window.addEventListener("resize", updateScale);

    setTimeout(() => updateScale());
  });

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
            config.dimensions.height,
          )}; margin: 0; }`}
        </style>
        {props.children}
      </div>

      <div class="print:hidden flex flex-col fixed top-4 left-4 gap-1">
        <button onClick={() => window.print()}>Print</button>

        <button
          onClick={() => setFit((fit) => (fit === "real" ? "fit" : "real"))}
        >
          {fit() === "real" ? "Fit to Screen" : "Actual Size"}
        </button>

        <button onClick={() => language.setLanguage(language.nextLanguage)}>
          {t(language.nextLanguage)}
        </button>

        <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
          <legend>Variant</legend>

          <For each={resume.names}>
            {(name) => (
              <label class="block">
                <input
                  type="radio"
                  checked={resume.name === name}
                  onChange={() => resume.select(name)}
                  class="mr-2"
                />
                {name}
              </label>
            )}
          </For>
        </fieldset>

        <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
          <legend>Global flags</legend>

          <For each={flags.globals}>
            {(flag) => (
              <label class="block">
                <input
                  type="checkbox"
                  checked={flags.isEnabled(flag)}
                  onChange={() => flags.toggle(flag)}
                  class="mr-2"
                />
                {s(flag).splitWords().join(" ").toTitleCase().value}
              </label>
            )}
          </For>
        </fieldset>

        <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
          <legend>Contextual flags</legend>

          <For each={flags.locals}>
            {(flag) => (
              <label class="block">
                <input
                  type="checkbox"
                  checked={flags.isEnabled(flag)}
                  onChange={() => flags.toggle(flag)}
                  class="mr-2"
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
