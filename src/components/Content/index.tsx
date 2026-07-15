import { useResume } from "../../contexts/ResumeContext";
import { Competences } from "../Utils/Competences";
import { Diplomas } from "../Utils/Diplomas";
import { Experiences } from "../Utils/Experience";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Content() {
  const resume = useResume();

  return (
    <div class="h-full flex flex-col justify-between">
      <Header />

      <Competences competences={resume.get("competences")} />

      <Experiences experiences={resume.get("experiences")} />

      <Diplomas diplomas={resume.get("diplomas")} />

      <Footer />
    </div>
  );
}
