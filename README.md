###### AUAUST TOOLS — Admin — Auto CV Generator

> This repository is made public to open the codebase to contributors. However, you have no right
> to modify, share or use any part of it if it is not intended to be pushed upstream.
> When contributing to this repo, you agree to assign your copyrights to AUAUST.

# Auto CV

This tool is specifically designed to generate a resume in a print-ready format to be conveniently exported as a PDF from a web browser. It is built using [SolidJS](https://www.solidjs.com/) and [TailwindCSS](https://tailwindcss.com/) to make it as lightweight and easy to configure as possible.

## Overview

Each job offer differs, and ideally, each resume should too. Manually adapting a resume to each job offer is tedious and time-consuming, even though the changes are often minimal and only textual. This led me to lower my resume expectations and use a generic one for all applications, which was not ideal.

I came to the conclusion that, as a longtime developer, I should be able to automate this task.

## Usage

This is a Vite project using pnpm as its package manager. To get started, clone the repository and install the dependencies:

```bash
pnpm install
```

Then, you can start the Vite development server:

```bash
pnpm dev
```

It is not necessary to build the project; exporting to PDF can be done directly from the development server.

From there, you can play with the frontend menu to edit the resume content, or alter the data files in `data/` and the presentation in `src/`.

## Concept

This tool aims to solve the main issue with editing resumes: the lack of separation between content and presentation in traditional word processors. It separates the resume into two parts: presentation and content. The first one, a basic single-page client-side rendered app contained in `src/` which generates HTML and CSS. The second part, content, a few `yaml` and `json` data files contained in `data/` which hold the document information.

The following features simplify translation and adaptation.

### Translation

Since the content is separated from the presentation in a structured format, it is easy to provide multiple translations of the same content. Values can always be provided as a simple string, untranslated, or as an object containing multiple translations. The UI, which is aware of the current language thanks to a reactive signal, will automatically pick the right translation.

### Flags

In addition to translations, flags can be used to adapt parts of the resume for different contexts or requirements. Flags are simply unique identifiers that are either enabled or disabled. Then, both from the data files and UI components, it is possible to conditionally render content based on the current flags.

The file `data/flags.json` contains the list of available flags in their default state. The UI provides a menu to toggle them on and off, which changes the resume reactively.

Through components, it's as simple as accessing them through `useFlags().isEnabled("flag_name")` and doing whichever logic is needed.
The data files also support flags through a special syntax. For example, the following entry:

```yaml
title:
  en: "I'm a developer and a designer!"
  fr: "Je suis développeur et designer !"
```

can be adapted to:

```yaml
title:
  when_design_relevant:
    en: "I'm a developer and a designer!"
    fr: "Je suis développeur et designer !"
  else:
    en: "I'm a developer!"
    fr: "Je suis développeur !"
```

Then, based on the value of the `design_relevant` flag, the title will automatically mention or hide the design part.

Flags are evaluated in order of appearance; the first matching `when_<flag>` condition applies or the `else` condition if no conditions match.

Combining "in-data" flags, "in-component" flags and translations, it becomes quite easy to provide a decently adapted resume for each job offer.

## Hot Reloading and Reactivity

As this tool uses Vite and SolidJS, it provides hot module replacement and reactivity out of the box. This means that while working on the resume, any change made to the content or the presentation is immediately reflected in the preview, without even needing to refresh the page. The reactivity also means that toggling between languages and flags is instantaneous, which enabled the tiny menu at the top left of the page to be added for live previewing. As such, the stored flags act as default values but can be changed live to adapt a resume in almost no time.

## Sponsor

This library is a project by us, [AUAUST](https://auaust.ch/). We sponsor ourselves!
