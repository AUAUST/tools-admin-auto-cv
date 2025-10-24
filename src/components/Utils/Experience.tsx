import { For } from "solid-js";
import type { Experience, Resume } from "../../utils/config";
import { md, t } from "../../utils/label";

export function Experiences(props: { experiences: Experience[] }) {
  return (
    <div>
      <h2 class="text-2xl font-medium text-black trim-text-box -mb-2">
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
      <hr class="mt-4 mb-1" />

      <div class="grid grid-cols-4 mb-2">
        <div>
          <h3 class="text-base font-normal text-black">
            {md(props.experience.company)}
          </h3>
        </div>

        <div class="col-start-2 -col-end-1 text-base leading-normal mb-2 trim-text-box">
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
    <div class="grid grid-cols-12 mt-3">
      <div class="text-sm text-gray-500">{props.experience.from}</div>

      <div class="col-span-3 pl-2">
        <h4 class="text-lg font-[450] text-black leading-tight trim-text-box whitespace-pre-line">
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
