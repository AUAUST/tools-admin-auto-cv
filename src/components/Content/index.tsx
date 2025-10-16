import { Footer } from "./Footer";
import { Header } from "./Header";

export function Content() {
  return (
    <div class="h-full flex flex-col justify-between">
      <Header />

      <div>
        <Footer />
      </div>
    </div>
  );
}
