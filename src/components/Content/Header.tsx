import { capitalize } from "@auaust/primitive-kit/strings";
import { createMemo, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useFlags } from "../../contexts/FlagsContext";
import { useResume } from "../../contexts/ResumeContext";
import { getProfile } from "../../utils/config";
import { label, t, type Translation } from "../../utils/label";

export function Header() {
  const resume = useResume();

  return (
    <header>
      <div class="grid grid-cols-2 gap-x-2 mb-5">
        <Title />

        <Contacts />
      </div>

      <For each={["about", "languages"] as const}>
        {(section) => (
          <>
            <hr class="mt-4 mb-1" />

            <div class="grid grid-cols-4 text-base">
              <h3 class="font-medium text-black trim-text-box">{t(section)}</h3>

              <div class="col-span-3 text-pretty leading-snug">
                {resume.md(section)}
              </div>
            </div>
          </>
        )}
      </For>
    </header>
  );
}

function Title() {
  const resume = useResume();

  const subtitle = createMemo(() => {
    const subtitles = resume
      .get("subtitles")
      .map((l) => label(l))
      .filter(Boolean);

    if (!subtitles.length) {
      return null;
    }

    const children = [];

    for (let i = 0; i < subtitles.length; i++) {
      if (i === 0) {
        children.push(capitalize(subtitles[i]));
      } else {
        children.push(", ", subtitles[i]);
      }

      // else if (i < subtitles.length - 1) {
      //   children.push(", ", subtitles[i]);
      // } else {
      //   children.push(" ", t("and"), " ", subtitles[i]);
      // }
    }

    return children;
  });

  return (
    <div>
      <h1 class="leading-none font-normal text-black text-3xl mb-2.5 text-balance whitespace-pre">
        {resume.md("title")}
      </h1>

      <h2 class="text-xl leading-snug">{subtitle()}</h2>
    </div>
  );
}

function Contacts() {
  const profile = getProfile();
  const flags = useFlags();

  return (
    <address class="h-fit grid grid-cols-2">
      <h2 class="leading-none text-2xl mb-2 col-span-full text-black">
        {profile.first_name} {profile.last_name}
      </h2>

      <For each={profile.contacts}>
        {(contact) => (
          <Show
            when={!flags.exists(contact.type) || flags.isEnabled(contact.type)}
          >
            <span class="font-mono text-sm leading-relaxed whitespace-nowrap">
              <Dynamic
                component={
                  {
                    email: Email,
                    phone: Phone,
                    linkedin: Link,
                    github: Link,
                    website: Link,
                    address: Address,
                  }[contact.type]
                }
                {...contact}
              />
            </span>
          </Show>
        )}
      </For>

      <Show when={flags.isEnabled("references_on_request")}>
        <span class="font-mono text-sm leading-relaxed whitespace-nowrap">
          {t("references_on_request")}
        </span>
      </Show>
    </address>
  );
}

function Email(contact: { value: string; label?: string }) {
  return (
    <a href={`mailto:${contact.value}`} class="reset">
      {label(contact)}
    </a>
  );
}

function Phone(contact: { value: string; label?: string }) {
  return (
    <a href={`tel:${contact.value}`} class="reset">
      {label(contact)}
    </a>
  );
}

function Link(contact: { value: string; label?: string }) {
  return (
    <a
      href={contact.value}
      target="_blank"
      rel="noopener noreferrer"
      class="reset"
    >
      {label(contact)}
    </a>
  );
}

function Address(contact: { label?: Translation }) {
  return <span>{label(contact)}</span>;
}
