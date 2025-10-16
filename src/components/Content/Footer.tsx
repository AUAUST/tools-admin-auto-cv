import { Show } from "solid-js";
import { useFlags } from "../../contexts/FlagsContext";
import { getResume } from "../../utils/config";
import { md } from "../../utils/label";

export function Footer() {
  const resume = getResume();
  const flags = useFlags();

  return (
    <Show when={flags.isEnabled("automation_relevant")}>
      <hr />
      <footer class="footer sp12 grid1-3">
        <h3>{md(resume.ai_and_automation)}</h3>
        <p class="notice">{md(resume.notice)}</p>
      </footer>
    </Show>
  );
}
