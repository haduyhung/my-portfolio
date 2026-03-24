import { Header } from "./header";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Skills } from "./sections/skills";
import { Experience } from "./sections/experience";
import { Projects } from "./sections/projects";
import { Contact } from "./sections/contact";
import { Footer } from "./footer";

export function HomeContent() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
