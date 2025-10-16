import { Content } from "./components/Content";
import { Document } from "./components/Document";
import { Page } from "./components/Page";

export default function App() {
  return (
    <Document>
      <Page>
        <Content></Content>
      </Page>
    </Document>
  );
}
