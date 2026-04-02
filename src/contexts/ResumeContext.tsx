import { s } from "@auaust/primitive-kit";
import { keys } from "@auaust/primitive-kit/objects";
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext,
  type ParentProps,
} from "solid-js";
import {
  files,
  getDocumentConfig,
  getYamlContent,
  type Resume,
} from "../utils/config";
import { md } from "../utils/label";

const ResumeContext = createContext<ReturnType<typeof createResume>>();

function createResume() {
  const resumeNames = Array.from(
    new Set(
      keys(files)
        .map((key) => s(key).after("resumes/").before("/").value)
        .filter(Boolean),
    ),
  );

  const [current, setCurrent] = createSignal<string>(
    resumeNames.indexOf(getDocumentConfig().resume) > -1
      ? getDocumentConfig().resume
      : resumeNames[0],
  );

  const content = createMemo<Resume>(() =>
    getYamlContent(`resumes/${current()}/resume`),
  );

  const flags = createMemo<Record<string, unknown>>(
    () => getYamlContent(`resumes/${current()}/flags`) || {},
  );

  createEffect(() => console.log("Current resume:", current(), flags()));

  return {
    get names() {
      return resumeNames;
    },
    get name() {
      return current();
    },
    select(resume: string) {
      if (!resumeNames.includes(resume)) {
        throw new Error(`Resume not found: ${resume}`);
      }

      setCurrent(resume);
    },
    get content() {
      return content();
    },
    get(property: keyof Resume) {
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

export function ResumeProvider(props: ParentProps) {
  return (
    <ResumeContext.Provider value={createResume()}>
      {props.children}
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
