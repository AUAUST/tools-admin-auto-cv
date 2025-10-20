import { For } from "solid-js";
import type { Experience, Resume } from "../../utils/config";
import { md } from "../../utils/label";

export function Experiences(props: { experiences: Experience[] }) {
  return (
    <div>
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
      <hr class="mt-8 mb-1" />

      <div class="grid grid-cols-4 mb-2">
        <div>
          <h3 class="text-lg font-normal">{md(props.experience.company)}</h3>
        </div>

        <div class="col-span-3">
          <h4 class="text-sm">{md(props.experience.title)}</h4>

          <div class="text-base leading-normal mb-2 col-span-3">
            {md(props.experience.description)}
          </div>
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
    <div class="grid grid-cols-8">
      <div class="col-start-2 font-medium text-sm">{props.experience.from}</div>

      <div class="col-span-6">
        <h4>{md(props.experience.title)}</h4>
        <div class="text-base leading-normal">
          {md(props.experience.description)}
        </div>
      </div>
    </div>
  );
}
