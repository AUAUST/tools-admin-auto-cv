import { getResume } from "../../utils/config";
import { md } from "../../utils/label";

export function Footer() {
  const resume = getResume();

  return (
    <footer class="sp12 grid1-3">
      <h3>{md(resume.ai_and_automation)}</h3>
      <p>{md(resume.notice)}</p>
    </footer>
  );
}
