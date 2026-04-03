import { S } from "@auaust/primitive-kit";
import { once } from "@auaust/primitive-kit/functions";
import { cached, mapped } from "@auaust/toolkit";
import yaml from "js-yaml";
import type { Language } from "../contexts/LanguageContext";
import type { Translation } from "./label";

export const files: Readonly<Record<string, string>> = Object.freeze(
  mapped(
    import.meta.glob("../../data/**/*", {
      query: "?raw",
      import: "default",
      eager: true,
    }),
    (file) => S.beforeLast(file.replace("../../data/", ""), "."),
    (content) => content as string,
  ),
);

export function getFileContent(file: string) {
  const content = files[file];
  if (!content) throw new Error(`File not found: ${file}`);
  return content;
}

export const getYamlContent: <T>(filename: string) => T = cached(
  (filename: string) => {
    return yaml.load(getFileContent(filename));
  },
) as any;

export type DocumentConfig = {
  title: string;
  language: Language;
  languages: Language[];
  resume: string;
  dimensions: { width: number; height: number };
  margins: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
};

export const getDocumentConfig = once(() =>
  getYamlContent<DocumentConfig>("document"),
);

export type Profile = {
  first_name: string;
  last_name: string;
  contacts: {
    type: "email" | "phone" | "linkedin" | "github" | "website" | "address";
    value: string;
    label?: string;
  }[];
};

export const getProfile = once(() => getYamlContent<Profile>("profile"));

export type Experience = {
  from: Translation;
  to?: Translation;
  title: Translation;
  description: Translation;
  subsections?: Experience[];
};

export type Competence = {
  title: Translation;
  description: Translation;
};

export type Resume = {
  title: Translation;
  subtitles: Translation[];
  about: Translation;
  languages: Translation;
  footnote: {
    title: Translation;
    text: Translation;
  };
  notice: Translation;
  experiences: (Experience & {
    company?: Translation;
  })[];
  competences: Competence[];
};

export const getLabels = once(() =>
  getYamlContent<Record<string, Translation>>("labels"),
);
