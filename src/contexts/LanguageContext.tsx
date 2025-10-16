import { s } from "@auaust/primitive-kit";
import {
  createContext,
  createSignal,
  useContext,
  type ParentProps,
  type Setter,
} from "solid-js";
import { getDocumentConfig } from "../utils/config";

export type Language = "fr" | "en";

const config = getDocumentConfig();

const LanguageContext = createContext<{
  language: Language;
  setLanguage: Setter<Language>;
  languages: Language[];
}>();

export function LanguageProvider(props: ParentProps<{ language?: Language }>) {
  const [language, setLanguage] = createSignal<Language>(
    props.language ?? config.language
  );

  const value = {
    get language() {
      return s(language()).lower().trim().value as Language;
    },
    setLanguage,
    languages: config.languages.map(
      (l) => s(l).lower().trim().value
    ) as Language[],
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
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
