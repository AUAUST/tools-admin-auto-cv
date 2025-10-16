import { getResume } from "../../utils/config";
import { md } from "../../utils/label";

export function Footer() {
  const resume = getResume();

  return (
    <footer>
      <h3>{md(resume.ai_and_automation)}</h3>
      <p>{md(resume.notice)}</p>
    </footer>
  );
}
