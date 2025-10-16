import { S } from "@auaust/primitive-kit";
import type { JSX } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { getLabels } from "./config";

export type Translation = Record<Language, string> | string;

export type Label =
  | Translation
  | { label?: Translation; title?: Translation; value?: Translation };

export function label(
  ...sources: (Label | undefined | null | false)[]
): string {
  const language = useLanguage();

  for (let source of sources) {
    if (!source) {
      continue;
    }

    if (S.isStrict(source)) {
      return source;
    }

    source = ((source as any).label ||
      (source as any).title ||
      (source as any).value ||
      source) as Translation;

    if (S.isStrict(source)) {
      return source;
    }

    if (S.isStrict(source[language.language])) {
      return source[language.language];
    }

    for (const lang of language.languages) {
      if (S.isStrict(source[lang])) {
        return source[lang];
      }
    }
  }

  return "";
}

export function md(
  ...sources: (Label | undefined | null | false)[]
): JSX.Element {
  const text = label(...sources);

  return <SolidMarkdown>{text}</SolidMarkdown>;
}

export function t(key: string): string {
  return label(getLabels()[key]);
}
