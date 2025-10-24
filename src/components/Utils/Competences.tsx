import { For } from "solid-js";
import type { Competence } from "../../utils/config";
import { md, t } from "../../utils/label";

export function Competences(props: { competences: Competence[] }) {
  return (
    <div>
      <h2 class="text-2xl font-semibold text-black trim-text-box -mb-2 mt-6">
        {t("competences")}
      </h2>

      <hr class="mt-4 mb-1" />

      <For each={props.competences}>
        {(experience) => <Competence competence={experience} />}
      </For>
    </div>
  );
}

export function Competence(props: { competence: Competence }) {
  return (
    <div>
      <div class="grid grid-cols-12 mb-2.5">
        <div class="col-span-4">
          <h3 class="text-lg font-medium text-black leading-tight trim-text-box whitespace-pre-line pl-2">
            {md(props.competence.title)}
          </h3>
        </div>

        <div class="col-span-8 text-base leading-snug trim-text-box">
          {md(props.competence.description)}
        </div>
      </div>
    </div>
  );
}
