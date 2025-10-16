import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { getProfile } from "../../utils/config";

export function Header() {
  const profile = getProfile();

  return (
    <header>
      <h1>
        {profile.first_name} {profile.last_name}
      </h1>
      <h2>{profile.title}</h2>

      <Contacts />
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
                  linkedin: Linkedin,
                  github: Github,
                  website: Website,
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
    <a href={`mailto:${contact.value}`}>{contact.label || contact.value}</a>
  );
}

function Phone(contact: { value: string; label?: string }) {
  return <a href={`tel:${contact.value}`}>{contact.label || contact.value}</a>;
}

function Linkedin(contact: { value: string; label?: string }) {
  return (
    <a href={contact.value} target="_blank" rel="noopener noreferrer">
      {contact.label || contact.value}
    </a>
  );
}

function Github(contact: { value: string; label?: string }) {
  return (
    <a href={contact.value} target="_blank" rel="noopener noreferrer">
      {contact.label || contact.value}
    </a>
  );
}

function Website(contact: { value: string; label?: string }) {
  return (
    <a href={contact.value} target="_blank" rel="noopener noreferrer">
      {contact.label || contact.value}
    </a>
  );
}
