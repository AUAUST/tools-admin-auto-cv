import { B, O } from "@auaust/primitive-kit";
import {
  createContext,
  createMemo,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js/store";
import flagsConfig from "../../resources/flags.json";

export type Flag = keyof typeof flagsConfig;

const FlagsContext = createContext<{
  enabled: Flag[];
  all: Flag[];
  toggle(flag: Flag): void;
  isEnabled(flag: Flag): boolean;
  exists(flag: Flag): boolean;
}>();

export function FlagsProvider(props: ParentProps) {
  const [flags, setFlags] = createStore<Record<Flag, boolean>>(
    O.keys(flagsConfig).reduce((acc, key) => {
      acc[key] = B(flagsConfig[key]);
      return acc;
    }, {} as Record<Flag, boolean>)
  );

  const toggle = (flag: Flag) => setFlags(flag, (v) => !v);

  const allFlags = createMemo(() => O.keys(flags));

  const enabledFlags = createMemo(() =>
    allFlags().filter((flag) => flags[flag])
  );

  const value = {
    get enabled() {
      return enabledFlags();
    },
    get all() {
      return allFlags();
    },
    toggle,
    isEnabled: (flag: Flag) => !!flags[flag],
    exists: (flag: any): flag is Flag => O.in(flag, flags),
  };

  return (
    <FlagsContext.Provider value={value}>
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
