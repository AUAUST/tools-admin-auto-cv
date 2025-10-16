import { Content } from "./components/Content";
import { Document } from "./components/Document";
import { Page } from "./components/Page";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <Document>
        <Page>
          <Content></Content>
        </Page>
      </Document>
    </LanguageProvider>
  );
}
