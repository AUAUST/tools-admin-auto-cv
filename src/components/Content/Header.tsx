import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useFlags } from "../../contexts/FlagsContext";
import { getProfile, getResume } from "../../utils/config";
import { label, md, t, type Translation } from "../../utils/label";

export function Header() {
  const profile = getProfile();
  const resume = getResume();

  return (
    <header class="grid grid-cols-12 gap-x-2">
      <div class="col-span-6">
        <h1 class="leading-none text-6xl mb-1">
          {profile.first_name} {profile.last_name}
        </h1>

        <h2 class="text-xl">{label(profile.title)}</h2>
      </div>

      <Contacts />

      <hr class="col-span-full mt-10 mb-1" />

      <div class="col-span-12 grid grid-cols-4 text-base">
        <h3 class="">{t("about")}</h3>
        <div class="col-span-3 text-balance leading-normal">
          {md(resume.about)}
        </div>
      </div>
    </header>
  );
}

function Contacts() {
  const profile = getProfile();
  const flags = useFlags();

  return (
    <address class="h-fit col-span-6 grid grid-cols-2">
      <For each={profile.contacts}>
        {(contact) => (
          <Show
            when={!flags.exists(contact.type) || flags.isEnabled(contact.type)}
          >
            <span class="font-mono text-sm leading-relaxed">
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
