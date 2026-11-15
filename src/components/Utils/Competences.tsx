import { For } from "solid-js";

import { md, t } from "../../utils/label";
import type { Competence } from "../../utils/config";

export function Competences(properties: { competences: Competence[] }) {
  return (
    <div>
      <h2 class="text-2xl font-[525] text-black trim-text-box -mb-2.5 mt-3.5">
        {t("competences")}
      </h2>

      <hr class="mt-4 mb-1" />

      <For each={properties.competences}>
        {(experience) => {
          return <Competence competence={experience} />;
        }}
      </For>
    </div>
  );
}

export function Competence(properties: { competence: Competence }) {
  return (
    <div>
      <div class="grid grid-cols-12 mb-2.5">
        <div class="col-span-4">
          <h3 class="text-lg font-medium text-black leading-tight trim-text-box whitespace-pre-line pl-2">
            {md(properties.competence.title)}
          </h3>
        </div>

        <div class="col-span-8 text-base leading-snug trim-text-box">
          {md(properties.competence.description)}
        </div>
      </div>
    </div>
  );
}
