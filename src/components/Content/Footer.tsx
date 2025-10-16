import { Show } from "solid-js";
import { useFlags } from "../../contexts/FlagsContext";
import { getResume } from "../../utils/config";
import { md } from "../../utils/label";

export function Footer() {
  const resume = getResume();
  const flags = useFlags();

  return (
    <Show when={flags.isEnabled("automation_relevant")}>
      <hr class="mb-1" />

      <footer class="grid grid-cols-4 text-xs">
        <h3 class="font-medium">{md(resume.ai_and_automation)}</h3>
        <div class="col-span-3 text-balance leading-snug wrap-normal break-keep">
          {md(resume.notice)}
        </div>
      </footer>
    </Show>
  );
}
