import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useFlags } from "../../contexts/FlagsContext";
import { getProfile, getResume } from "../../utils/config";
import { label, md, t, type Translation } from "../../utils/label";

export function Header() {
  const profile = getProfile();
  const resume = getResume();

  return (
    <header class="header grid12">
      <div class="sp6">
        <h1 class="name">
          {profile.first_name} {profile.last_name}
        </h1>
        <h2 class="title">{label(profile.title)}</h2>
      </div>

      <Contacts />

      <hr class="sp12" />

      <div class="sp12 grid1-3">
        <h3>{t("about")}</h3>
        <p>{md(resume.about)}</p>
      </div>
    </header>
  );
}

function Contacts() {
  const profile = getProfile();
  const flags = useFlags();

  return (
    <address class="contacts sp6 grid6 reset">
      <For each={profile.contacts}>
        {(contact) => (
          <Show
            when={!flags.exists(contact.type) || flags.isEnabled(contact.type)}
          >
            <span class="sp3 mono">
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
