import { Show } from "solid-js";
import { useFlags } from "../../contexts/FlagsContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getResume } from "../../utils/config";
import { md, t } from "../../utils/label";

export function Footer() {
  const resume = getResume();
  const flags = useFlags();
  const language = useLanguage();

  return (
    <Show when={flags.isEnabled("automation_relevant")}>
      <hr class="mb-1 -mt-2" />

      <footer class="grid grid-cols-12 text-xs leading-snug">
        <h3 class="col-span-3 font-medium text-black">
          {md(resume.ai_and_automation)}
        </h3>

        <div class="col-span-7 text-balance wrap-normal break-keep">
          {md(resume.notice)}
        </div>

        <div class="col-span-2 text-right">
          {t("generation_date")}
          <br />
          {new Date().toLocaleDateString(language.language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </footer>
    </Show>
  );
}
