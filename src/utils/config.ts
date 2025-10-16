import { once } from "@auaust/primitive-kit/functions";
import yaml from "js-yaml";
import type { Language } from "../contexts/LanguageContext";
import type { Translation } from "./label";

const files: Record<string, string> = import.meta.glob(
  "../../resources/*.yml",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
);

export function getFileContent(file: string) {
  const content = files[`../../resources/${file}.yml`];
  if (!content) throw new Error(`File not found: ${file}`);
  return content;
}

export function getYamlContent<T>(filename: string): T {
  return yaml.load(getFileContent(filename)) as T;
}

export interface DocumentConfig {
  language: Language;
  languages: Language[];
  dimensions: { width: number; height: number };
  margins: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export const getDocumentConfig = once(() =>
  getYamlContent<DocumentConfig>("document")
);

export interface Profile {
  first_name: string;
  last_name: string;
  title: Translation;
  contacts: {
    type: "email" | "phone" | "linkedin" | "github" | "website" | "address";
    value: string;
    label?: string;
  }[];
}

export const getProfile = once(() => getYamlContent<Profile>("profile"));

export interface Resume {
  about: Translation;
  ai_and_automation: Translation;
  notice: Translation;
}

export const getResume = once(() => getYamlContent<Resume>("resume"));

export const getLabels = once(() =>
  getYamlContent<Record<string, Translation>>("labels")
);
