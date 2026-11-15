import { For, Match, Switch } from "solid-js";

import { md, t, type Translation } from "../../utils/label";
import type { Experience, Resume } from "../../utils/config";

export function Experiences(properties: { experiences: Experience[] }) {
  return (
    <div>
      <h2 class="text-2xl font-[525] text-black trim-text-box mb-1.5">
        {t("experiences")}
      </h2>

      <For each={properties.experiences}>
        {(experience) => {
          return <Experience experience={experience} />;
        }}
      </For>
    </div>
  );
}

export function Experience(properties: {
  experience: Resume["experiences"][number];
}) {
  return (
    <div>
      <hr class="mb-1" />

      <div class="grid grid-cols-4 mb-1">
        <div>
          <h3 class="text-base font-normal text-black pl-2">
            {md(properties.experience.company)}
          </h3>
        </div>

        <div class="col-start-2 -col-end-1 text-base leading-snug mb-1 trim-text-box">
          {md(properties.experience.description)}
        </div>
      </div>

      <For each={properties.experience.subsections}>
        {(subexp) => {
          return <SubExperience experience={subexp} />;
        }}
      </For>
    </div>
  );
}

export function SubExperience(properties: { experience: Experience }) {
  return (
    <div class="grid grid-cols-12 mt-2 last-of-type:mb-4">
      <Timestamp {...properties.experience} />

      <div class="col-span-3 trim-text-box">
        <h4 class="text-lg font-[450] text-black leading-tight whitespace-pre-line pr-2">
          {md(properties.experience.title)}
        </h4>
      </div>

      <div class="col-span-8">
        <div class="text-base leading-snug trim-text-box">
          {md(properties.experience.description)}
        </div>
      </div>
    </div>
  );
}

export function Timestamp({
  from,
  to,
}: {
  from: Translation;
  to?: Translation;
}) {
  return (
    <div class="text-xs text-gray-600 trim-text-box pl-2">
      <Switch fallback={md(from)}>
        <Match when={to === "now"}>
          {t("since")} {md(from)}
        </Match>

        <Match when={to}>
          {md(from)} - {md(to)}
        </Match>
      </Switch>
    </div>
  );
}
