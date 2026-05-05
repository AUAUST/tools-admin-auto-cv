import { cl } from "@auaust/g-class";
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
    <>
      <Show
        when={flags.isEnabled("show_interests") && resume.content.interests}
      >
        <div>
          <hr class="mb-1 -mt-2" />

          <section class="grid grid-cols-4 mb-1">
            <h2 class="text-base font-normal text-black pl-2">
              {md(resume.content.interests.title)}
            </h2>

            <div class="col-start-2 -col-end-1 text-sm mb-2 trim-text-box leading-snug">
              {md(resume.content.interests.text)}
            </div>
          </section>
        </div>
      </Show>

      <Show when={flags.isEnabled("show_footnote")}>
        <div>
          <hr class="mb-1 -mt-2" />

          <footer class="grid grid-cols-12 text-xs leading-snug">
            <Show
              when={resume.content.footnote}
              fallback={<div class="col-span-10" />}
            >
              <h3 class="col-span-3 font-medium text-black">
                {md(resume.content.footnote.title)}
              </h3>

              <div
                class={cl(
                  "text-balance wrap-normal break-keep whitespace-pre",
                  flags.isEnabled("show_generation_date")
                    ? "col-span-7"
                    : "col-span-9",
                )}
              >
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
        </div>
      </Show>
    </>
  );
}
