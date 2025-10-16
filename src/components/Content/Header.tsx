import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { getProfile, getResume } from "../../utils/config";
import { label, t } from "../../utils/label";

export function Header() {
  const profile = getProfile();
  const resume = getResume();

  return (
    <header>
      <h1>
        {profile.first_name} {profile.last_name}
      </h1>
      <h2>{label(profile.title)}</h2>

      <Contacts />

      <hr />

      <h3>{t("about")}</h3>
      <p>{label(resume.about)}</p>
    </header>
  );
}

function Contacts() {
  const profile = getProfile();

  return (
    <ul>
      <For each={profile.contacts}>
        {(contact) => (
          <li>
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
  return <a href={`mailto:${contact.value}`}>{label(contact)}</a>;
}

function Phone(contact: { value: string; label?: string }) {
  return <a href={`tel:${contact.value}`}>{label(contact)}</a>;
}

function Link(contact: { value: string; label?: string }) {
  return (
    <a href={contact.value} target="_blank" rel="noopener noreferrer">
      {label(contact)}
    </a>
  );
}
