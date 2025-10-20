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
      <hr class="mt-4 mb-1" />

      <div class="grid grid-cols-4 mb-2">
        <div>
          <h3 class="text-lg font-normal text-black">
            {md(props.experience.company)}
          </h3>
        </div>

        <div class="col-span-3 text-base leading-normal mb-2">
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
    <div class="grid grid-cols-8 mt-3">
      <div class="col-start-2 text-sm font-mono font-semibold text-black">
        {props.experience.from}
      </div>

      <div class="col-span-6">
        <h4 class="text-black">{md(props.experience.title)}</h4>
        <div class="text-base leading-snug">
          {md(props.experience.description)}
        </div>
      </div>
    </div>
  );
}
