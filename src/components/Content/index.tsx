import { getResume } from "../../utils/config";
import { Competences } from "../Utils/Competences";
import { Experiences } from "../Utils/Experience";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Content() {
  const resume = getResume();

  return (
    <div class="h-full flex flex-col justify-between">
      <Header />

      <Competences competences={resume.competences} />

      <Experiences experiences={resume.experiences} />

      <Footer />
    </div>
  );
}
