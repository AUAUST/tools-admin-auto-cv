import {
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  type ParentProps,
} from "solid-js";

import { cl } from "@auaust/g-class";
import { s } from "@auaust/primitive-kit";
import { min } from "@auaust/primitive-kit/numbers";

import { useFlags } from "../contexts/FlagsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useResume } from "../contexts/ResumeContext";
import { getDocumentConfig } from "../utils/config";
import { label, t } from "../utils/label";
import { mm } from "../utils/units";

function fitScale(element: HTMLElement | undefined) {
  if (!element) {
    throw new Error("Document element is not mounted.");
  }

  return min(
    window.innerWidth / element.offsetWidth,
    window.innerHeight / element.offsetHeight,
  );
}

export function Document(properties: ParentProps) {
  const config = getDocumentConfig();
  const language = useLanguage();
  const flags = useFlags();
  const resume = useResume();

  const [fit, setFit] = createSignal<"real" | "fit">("fit");
  const [scale, setScale] = createSignal(1);

  const [doc, setDoc] = createSignal<HTMLDivElement>();

  const updateScale = () => setScale(fitScale(doc()));

  createEffect(() => {
    return (document.title = label(config.title).replace(
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
    ));
  });

  onMount(() => {
    window.addEventListener("resize", updateScale);
    onCleanup(() => void window.removeEventListener("resize", updateScale));

    setTimeout(() => updateScale());
  });

  return (
    <>
      <div
        class={cl("document", fit())}
        ref={setDoc}
        style={{
          "--scale": scale(),
        }}>
        <style>
          {`@page { size: ${mm(config.dimensions.width)} ${mm(
            config.dimensions.height,
          )}; margin: 0; }`}
        </style>
        {properties.children}
      </div>

      <div class="print:hidden flex flex-col fixed top-4 left-4 gap-1">
        <button onClick={() => void globalThis.print()}>Print</button>

        <button
          onClick={() => {
            return setFit((fit) => {
              return fit === "real" ? "fit" : "real";
            });
          }}>
          {fit() === "real" ? "Fit to Screen" : "Actual Size"}
        </button>

        <button onClick={() => language.setLanguage(language.nextLanguage)}>
          {t(language.nextLanguage)}
        </button>

        <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
          <legend>Variant</legend>

          <For each={resume.names}>
            {(name) => {
              return (
                <label class="block">
                  <input
                    type="radio"
                    checked={resume.name === name}
                    onChange={() => void resume.select(name)}
                    class="mr-2"
                  />
                  {name}
                </label>
              );
            }}
          </For>
        </fieldset>

        <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
          <legend>Global flags</legend>

          <For each={flags.globals}>
            {(flag) => {
              return (
                <label class="block">
                  <input
                    type="checkbox"
                    checked={flags.isEnabled(flag)}
                    onChange={() => void flags.toggle(flag)}
                    class="mr-2"
                  />
                  {s(flag).splitWords().join(" ").toTitleCase().value}
                </label>
              );
            }}
          </For>
        </fieldset>

        <Show when={flags.locals.length}>
          <fieldset class="px-0.5 pl-2 pr-6 text-white border border-white">
            <legend>Contextual flags</legend>

            <For each={flags.locals}>
              {(flag) => {
                return (
                  <label class="block">
                    <input
                      type="checkbox"
                      checked={flags.isEnabled(flag)}
                      onChange={() => void flags.toggle(flag)}
                      class="mr-2"
                    />
                    {s(flag).splitWords().join(" ").toTitleCase().value}
                  </label>
                );
              }}
            </For>
          </fieldset>
        </Show>
      </div>
    </>
  );
}
