import { Content } from "./components/Content";
import { Document } from "./components/Document";
import { Page } from "./components/Page";
import { FlagsProvider } from "./contexts/FlagsContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ResumeProvider } from "./contexts/ResumeContext";

export default function App() {
  return (
    <LanguageProvider>
      <ResumeProvider>
        <FlagsProvider>
          <Document>
            <Page>
              <Content />
            </Page>
          </Document>
        </FlagsProvider>
      </ResumeProvider>
    </LanguageProvider>
  );
}
