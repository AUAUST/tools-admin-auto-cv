import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { getProfile, getResume } from "../../utils/config";
import { label, md, t } from "../../utils/label";

export function Header() {
  const profile = getProfile();
  const resume = getResume();

  return (
    <header class="header grid12">
      <div class="sp6">
        <h1>
          {profile.first_name} {profile.last_name}
        </h1>
        <h2>{label(profile.title)}</h2>
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

  return (
    <ul class="sp6 grid6 reset">
      <For each={profile.contacts}>
        {(contact) => (
          <li class="sp3 mono">
            <Dynamic
              component={
                {
                  email: Email,
                  phone: Phone,
                  linkedin: Link,
                  github: Link,
                  website: Link,
                }[contact.type]
              }
              {...contact}
            />
          </li>
        )}
      </For>
    </ul>
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
