import { getDocumentConfig } from "../utils/config";

export function Document() {
  return <div>{JSON.stringify(getDocumentConfig(), null, 2)}</div>;
}
