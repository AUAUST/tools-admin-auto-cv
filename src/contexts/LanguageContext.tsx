import {
  createContext,
  createMemo,
  createSignal,
  useContext,
  type ParentProps,
  type Setter,
} from "solid-js";

import { s } from "@auaust/primitive-kit";

import { getDocumentConfig } from "../utils/config";

export type Language = "fr" | "en";

const config = getDocumentConfig();

const LanguageContext = createContext<{
  language: Language;
  setLanguage: Setter<Language>;
  languages: Language[];
  nextLanguage: Language;
}>();

export function LanguageProvider(
  properties: ParentProps<{ language?: Language }>,
) {
  const [
    language,
    setLanguage,
  ] = createSignal<Language>(properties.language ?? config.language);

  const next = createMemo(() => {
    const index = config.languages.indexOf(language());

    return config.languages[(index + 1) % config.languages.length];
  });

  const value = {
    get language() {
      return s(language()).lower().trim().value as Language;
    },
    setLanguage,
    languages: config.languages.map(
      (l) => s(l).lower().trim().value,
    ) as Language[],
    get nextLanguage() {
      return next();
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {properties.children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
