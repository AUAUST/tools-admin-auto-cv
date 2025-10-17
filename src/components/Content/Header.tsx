import { children, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useFlags } from "../../contexts/FlagsContext";
import { getProfile, getResume } from "../../utils/config";
import { label, md, t, type Translation } from "../../utils/label";

export function Header() {
  const resume = getResume();

  return (
    <header class="grid grid-cols-[5fr_4fr] gap-x-2">
      <Title />

      <Contacts />

      <hr class="col-span-full mt-8 mb-1" />

      <div class="col-span-12 grid grid-cols-4 text-base">
        <h3 class="">{t("about")}</h3>
        <div class="col-span-3 text-balance leading-normal">
          {md(resume.about)}
        </div>
      </div>
    </header>
  );
}

function Title() {
  const profile = getProfile();
  const flags = useFlags();

  const specialty = children(() => {
    const [a, b] = flags.isEnabled("frontend_first")
      ? [profile.specialty_frontend, profile.specialty_backend]
      : [profile.specialty_backend, profile.specialty_frontend];

    return [md(a), " ", t("and"), " ", md(b)];
  });

  return (
    <div>
      <h1 class="leading-none text-3xl mb-2.5 text-balance">
        {md(profile.title)}
      </h1>

      <h2 class="text-xl">{specialty()}</h2>
    </div>
  );
}

function Contacts() {
  const profile = getProfile();
  const flags = useFlags();

  return (
    <address class="h-fit grid grid-cols-2">
      <h2 class="leading-none text-2xl mb-2 col-span-full">
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
