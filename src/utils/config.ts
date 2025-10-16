import { once } from "@auaust/primitive-kit/functions";
import yaml from "js-yaml";

const files = import.meta.glob("../../resources/*.yml", {
  as: "raw",
  eager: true,
});

export function getFileContent(file: string) {
  const content = files[`../../resources/${file}.yml`];
  if (!content) throw new Error(`File not found: ${file}`);
  return content;
}

export function getYamlContent<T>(filename: string): T {
  return yaml.load(getFileContent(filename)) as T;
}

export interface DocumentConfig {
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
  title: string;
  contacts: {
    type: "email" | "phone" | "linkedin" | "github" | "website";
    value: string;
    label?: string;
  }[];
}

export const getProfile = once(() => getYamlContent<Profile>("profile"));
