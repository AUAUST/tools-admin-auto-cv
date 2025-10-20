import { getResume } from "../../utils/config";
import { Experiences } from "../Utils/Experience";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Content() {
  const resume = getResume();

  return (
    <div class="h-full flex flex-col justify-between">
      <Header />

      <div>
        <Experiences experiences={resume.experiences} />

        <Footer />
      </div>
    </div>
  );
}
