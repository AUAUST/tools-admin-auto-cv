import { once } from "@auaust/primitive-kit/functions";
import yaml from "js-yaml";
import documentConfig from "../../resources/document.yml?raw";

export const getDocumentConfig = once(() => yaml.load(documentConfig));
