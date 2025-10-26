###### AUAUST TOOLS — Admin — Auto CV Generator

> This repository is made public to open the codebase to contributors. However, you have no right
> to modify, share or use any part of it if it is not intended to be pushed upstream.
> When contributing to this repo, you agree to assign your copyrights to AUAUST.

# Auto CV

Auto CV is a lightweight [SolidJS](https://www.solidjs.com/) client-side tool for generating print-ready resumes. It produces consistent resumes for different job offers by re-ordering or emphasizing existing experiences. The final document can be exported as PDF directly from the browser’s “Print” dialog.

## Purpose

Each job posting highlights different priorities. Manually re-editing the same resume for each offer is repetitive and error-prone. This tool maintains a single structured data source while allowing flag-based toggles to emphasize relevant skills per role. The result is a consistent, tailored PDF version of my resume generated in seconds.

## Usage

This is a Vite project using pnpm as its package manager. To get started, clone the repository and install the dependencies:

```bash
pnpm install
```

Then, you can start the Vite development server:

```bash
pnpm dev
```

It is not necessary to build the project; exporting to PDF can be done directly from the development mode. Open your browser and navigate to the provided local address (usually `http://localhost:5173/`) and hit the print button.

## Core Concepts

### Separation of Content and Presentation

The biggest challenge when editing resumes in traditional word processors is the constant need to adapt the content while ensuring the presentation remains consistent. This is what this tool addresses. It provides a clear separation between content and presentation, allowing for easy modifications to either without affecting the other.

`/data` contains all the content of the resume in structured `yaml`, including translations and variants based on flags and supporting embedded [Markdown](https://www.markdownguide.org/) for rich text formatting where needed.

`/src` contains the [SolidJS](https://www.solidjs.com/) components which define the presentation of the resume. The `label()` function implements the logic to select the right translation and flag-based variant.

### Translation

Each text entry in the data files supports multiple translations through a simple syntax. Where a single string can be used, a mapping of language codes to strings can be provided instead. For example, the following entry:

```yaml
title: "I'm a developer!"
```

can be adapted to:

```yaml
title:
  en: "I'm a developer!"
  fr: "Je suis développeur !"
```

Editting `/data/document.yml`'s `language` field allows to set the default language, or it can be changed live through the UI menu.

### Flags

On top of translations, the resume content can be adapted based on specific flags. A flag is a simple boolean identifier that can be toggled on or off, and allows to adapt the resume content based on its state. For example, the above title entry can be further adapted to use a `"target_laravel"` and `"design_relevant"` flag:

```yaml
title:
  when_target_laravel:
    en: "I'm a Laravel developer!"
    fr: "Je suis développeur Laravel !"
  when_design_relevant:
    en: "I'm a developer and a designer!"
    fr: "Je suis développeur et designer !"
  else:
    en: "I'm a developer!"
    fr: "Je suis développeur !"
```

The `when_` prefix is used to denote flag-based conditions as well as improving readability. The `else` condition is used as a fallback when no flag matched. Flags are evaluated in order of appearance, meaning that the first matching condition is selected.

Flags can be toggled live through the UI menu, through editing the `data/flags.json` file, or programmatically through components.

To retrieve the current state of flags in components, the flag context can be accessed through `useFlags()`. It provides a method `isEnabled` to check if a flag is enabled or not:

```tsx
function Component() {
  const flags = useFlags();

  return (
    <Show when={flags.isEnabled("address")}>
      <Address />
    </Show>
  );
}
```

Combining translations, flagged labels and conditional rendering allows for a highly dynamic and adaptable resume generation system, but most importantly to edit and maintain the content over time without having to deal with the presentation details.

## Hot Reloading and Reactivity

Cherry on top, as this tool uses Vite and SolidJS, it provides hot module replacement and reactivity out of the box. This means that while working on the resume, any change made to the content or the presentation is immediately reflected in the preview, without even needing to refresh the page.

This also allowed for the tiny menu at the top left of the page to be added for live previewing which effectively removes the need to edit the `data/flags.json` file directly when testing different configurations.

## Sponsor

This library is a project by us, [AUAUST](https://auaust.ch/). We sponsor ourselves!
