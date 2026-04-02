import { B, O } from "@auaust/primitive-kit";
import {
  createContext,
  createEffect,
  createMemo,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js/store";
import globalFlagsConfig from "../../data/flags.json";
import { useResume } from "./ResumeContext";

export type Flag = keyof typeof globalFlagsConfig | (string & {});

const FlagsContext = createContext<ReturnType<typeof createFlags>>();

function createFlags() {
  const resume = useResume();

  const [flags, setFlags] = createStore<Record<Flag, boolean>>(
    O.keys(globalFlagsConfig).reduce(
      (acc, key) => {
        acc[key] = B(globalFlagsConfig[key]);
        return acc;
      },
      {} as Record<Flag, boolean>,
    ),
  );

  const toggle = (flag: Flag) => setFlags(flag, (v) => !v);

  const localFlags = createMemo(() => O.keys(resume.flags));

  createEffect(() => {
    for (const flag of localFlags()) {
      if (!(flag in flags)) {
        setFlags(flag, B(resume.flags[flag]));
      }
    }
  });

  return {
    globals: O.keys(globalFlagsConfig),
    get locals() {
      return localFlags();
    },
    toggle,
    isEnabled: (flag: Flag) => !!flags[flag],
    exists: (flag: any): flag is Flag => O.in(flag, flags),
  };
}

export function FlagsProvider(props: ParentProps) {
  return (
    <FlagsContext.Provider value={createFlags()}>
      {props.children}
    </FlagsContext.Provider>
  );
}

export function useFlags() {
  const context = useContext(FlagsContext);

  if (!context) {
    throw new Error("useFlags must be used within a FlagsProvider");
  }

  return context;
}
