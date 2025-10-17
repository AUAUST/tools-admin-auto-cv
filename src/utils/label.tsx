import { O, S } from "@auaust/primitive-kit";
import { keys } from "@auaust/primitive-kit/objects";
import type { JSX } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { useFlags, type Flag } from "../contexts/FlagsContext";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { getLabels } from "./config";

export type Translation = Record<Language, string> | string | undefined;

export type FlaggedTranslation = {
  [key in `when_${string}`]: Translation;
} & { else?: Translation };

export type Label =
  | Translation
  | FlaggedTranslation
  | {
      label?: Translation | FlaggedTranslation;
      title?: Translation | FlaggedTranslation;
      value?: Translation | FlaggedTranslation;
    };

function getFlaggedTranslation(
  source: FlaggedTranslation | Translation
): Translation | undefined {
  const flags = useFlags();

  if (!O.is(source)) {
    return source;
  }

  const conditions = keys(source).filter((k) =>
    S(k).startsWith("when_")
  ) as string[];

  if (!conditions.length) {
    return source as Translation;
  }

  const condition = conditions.find((condition) => {
    const flag = S.afterFirst(condition, "when_") as Flag;

    return flags.isEnabled(flag);
  }) as keyof typeof source | undefined;

  if (condition) {
    return source[condition];
  }

  return (source as any).else;
}

function getTranslation(
  source: Translation,
  language: Language
): string | undefined {
  if (!source) {
    return undefined;
  }

  if (S.isStrict(source)) {
    return source;
  }

  if (S.isStrict(source[language])) {
    return source[language];
  }

  const languages = useLanguage().languages;

  for (const lang of languages) {
    if (S.isStrict(source[lang])) {
      return source[lang];
    }
  }
}

export function label(
  ...sources: (FlaggedTranslation | Label | undefined | null | false)[]
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

    const flagged = getFlaggedTranslation(source);
    const translated = getTranslation(flagged, language.language);

    if (S.isStrict(translated)) {
      return translated;
    }
  }

  return "";
}

export function md(
  ...sources: (FlaggedTranslation | Label | undefined | null | false)[]
): JSX.Element {
  const text = label(...sources);

  return <SolidMarkdown class="contents prose-inline">{text}</SolidMarkdown>;
}

export function t(key: string): string {
  return label(getLabels()[key]);
}
