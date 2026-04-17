import { Show } from "solid-js";
import { useFlags } from "../../contexts/FlagsContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useResume } from "../../contexts/ResumeContext";
import { md, t } from "../../utils/label";

export function Footer() {
  const resume = useResume();
  const flags = useFlags();
  const language = useLanguage();

  return (
    <Show when={flags.isEnabled("show_footnote")}>
      <hr class="mb-1 -mt-2" />

      <footer class="grid grid-cols-12 text-xs leading-snug">
        <Show
          when={resume.content.footnote}
          fallback={<div class="col-span-10" />}
        >
          <h3 class="col-span-3 font-medium text-black">
            {md(resume.content.footnote.title)}
          </h3>

          <div class="col-span-9 text-balance wrap-normal break-keep whitespace-pre">
            {md(resume.content.footnote.text)}
          </div>
        </Show>

        <Show when={flags.isEnabled("show_generation_date")}>
          <div class="col-span-2 text-right">
            {t("generation_date")}
            <br />
            {new Date().toLocaleDateString(language.language, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </Show>
      </footer>
    </Show>
  );
}
