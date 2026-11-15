/* @refresh reload */
import "./styles/index.css";

import { render } from "solid-js/web";

import App from "./App";

render(() => {
  return <App />;
}, document.querySelector("#root")!);
