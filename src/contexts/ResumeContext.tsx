import {
  createContext,
  createMemo,
  createSignal,
  useContext,
  type ParentProps,
} from "solid-js";

import { s } from "@auaust/primitive-kit";
import { keys } from "@auaust/primitive-kit/objects";

import {
  files,
  getDocumentConfig,
  getYamlContent,
  type Resume,
} from "../utils/config";
import { md } from "../utils/label";

const ResumeContext = createContext<ReturnType<typeof createResume>>();

function createResume() {
  const names = Array.from(
    new Set(
      keys(files)
        .map((key) => s(key).after("resumes/").before("/").value)
        .filter(Boolean),
    ),
  );

  const [current, setCurrent] = createSignal<string>(
    names.includes(getDocumentConfig().resume)
      ? getDocumentConfig().resume
      : names[0],
  );

  const content = createMemo<Resume>(() => {
    return getYamlContent(`resumes/${current()}/resume`);
  });

  const flags = createMemo<Record<string, unknown>>(() => {
    return getYamlContent(`resumes/${current()}/flags`) || {};
  });

  return {
    get names() {
      return names;
    },
    get name() {
      return current();
    },
    select(resume: string) {
      if (!names.includes(resume)) {
        throw new Error(`Resume not found: ${resume}`);
      }

      setCurrent(resume);
    },
    get content() {
      return content();
    },
    get<K extends keyof Resume>(property: K): Resume[K] {
      return content()[property];
    },
    md(property: keyof Resume) {
      // @ts-expect-error
      return md(content()[property]);
    },
    get flags() {
      return flags();
    },
  };
}

export function ResumeProvider(properties: ParentProps) {
  return (
    <ResumeContext.Provider value={createResume()}>
      {properties.children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }

  return context;
}
