/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App.tsx";

import.meta.glob("./styles/*.css", { eager: true });

render(() => <App />, document.getElementById("root")!);
