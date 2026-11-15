import { For, Show } from "solid-js";

import { md, t } from "../../utils/label";
import { Timestamp } from "./Experience";
import type { Diploma } from "../../utils/config";

export function Diplomas(properties: { diplomas: Diploma[] }) {
  return (
    <Show when={properties.diplomas?.length > 0}>
      <div class="-mt-2.5">
        <h2 class="text-2xl font-[525] text-black trim-text-box mb-1.5">
          {t("diplomas")}
        </h2>

        <hr class="-mb-0.5" />

        <For each={properties.diplomas}>
          {(diploma) => {
            return <Diploma diploma={diploma} />;
          }}
        </For>
      </div>
    </Show>
  );
}

export function Diploma(properties: { diploma: Diploma }) {
  return (
    <div class="grid grid-cols-12 mt-2 last-of-type:mb-4">
      <Timestamp {...properties.diploma} />

      <div class="col-span-3 trim-text-box">
        <h4 class="text-lg font-[450] text-black leading-tight whitespace-pre-line pr-2">
          {md(properties.diploma.title)}
        </h4>
      </div>

      <div class="col-span-8">
        <div class="text-base leading-snug trim-text-box">
          {md(properties.diploma.description)}
        </div>
      </div>
    </div>
  );
}
