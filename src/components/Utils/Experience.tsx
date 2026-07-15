import { For, Match, Switch } from "solid-js";
import type { Experience, Resume } from "../../utils/config";
import { md, t, type Translation } from "../../utils/label";

export function Experiences(props: { experiences: Experience[] }) {
  return (
    <div>
      <h2 class="text-2xl font-[525] text-black trim-text-box mb-1.5">
        {t("experiences")}
      </h2>

      <For each={props.experiences}>
        {(experience) => <Experience experience={experience} />}
      </For>
    </div>
  );
}

export function Experience(props: {
  experience: Resume["experiences"][number];
}) {
  return (
    <div>
      <hr class="mb-1" />

      <div class="grid grid-cols-4 mb-1">
        <div>
          <h3 class="text-base font-normal text-black pl-2">
            {md(props.experience.company)}
          </h3>
        </div>

        <div class="col-start-2 -col-end-1 text-base leading-snug mb-1 trim-text-box">
          {md(props.experience.description)}
        </div>
      </div>

      <For each={props.experience.subsections}>
        {(subexp) => <SubExperience experience={subexp} />}
      </For>
    </div>
  );
}

export function SubExperience(props: { experience: Experience }) {
  return (
    <div class="grid grid-cols-12 mt-2 last-of-type:mb-4">
      <Timestamp {...props.experience} />

      <div class="col-span-3 trim-text-box">
        <h4 class="text-lg font-[450] text-black leading-tight whitespace-pre-line pr-2">
          {md(props.experience.title)}
        </h4>
      </div>

      <div class="col-span-8">
        <div class="text-base leading-snug trim-text-box">
          {md(props.experience.description)}
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
