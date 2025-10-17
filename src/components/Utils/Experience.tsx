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
    <div class="grid grid-cols-12">
      <div class="col-span-3">
        <h3 class="font-bold text-sm">{md(props.experience.company)}</h3>
        {props.experience.from}
        {md(props.experience.address)}
      </div>

      <div class="col-span-9">
        <h4 class="italic text-sm">{md(props.experience.title)}</h4>
        <p class="text-sm mb-2">{md(props.experience.description)}</p>

        <For each={props.experience.subsections}>
          {(subexp) => <SubExperience experience={subexp} />}
        </For>
      </div>
    </div>
  );
}

export function SubExperience(props: { experience: Experience }) {
  return (
    <div>
      {props.experience.from}
      <h4>{md(props.experience.title)}</h4>
      <div>{md(props.experience.description)}</div>
    </div>
  );
}
