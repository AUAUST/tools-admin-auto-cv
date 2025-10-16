import { Content } from "./components/Content";
import { Document } from "./components/Document";
import { Page } from "./components/Page";
import { FlagsProvider } from "./contexts/FlagsContext";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <FlagsProvider>
        <Document>
          <Page>
            <Content />
          </Page>
        </Document>
      </FlagsProvider>
    </LanguageProvider>
  );
}
