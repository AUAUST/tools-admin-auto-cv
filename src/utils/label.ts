import { S } from "@auaust/primitive-kit";
import { useLanguage, type Language } from "../contexts/LanguageContext";

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
