"use client";

import ReactFullpage from "@fullpage/react-fullpage";
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
      <ReactFullpage
        licenseKey="gplv3-license"
        credits={{ enabled: true }}
        scrollingSpeed={800}
        navigation
        navigationPosition="right"
        scrollOverflow
        onLeave={(_origin, destination) => {
          window.dispatchEvent(
            new CustomEvent("fp-section-change", {
              detail: { index: destination.index },
            })
          );
        }}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Hero />
            </div>
            <div className="section">
              <About />
            </div>
            <div className="section">
              <Skills />
            </div>
            <div className="section">
              <Experience />
            </div>
            <div className="section">
              <Projects />
            </div>
            <div className="section fp-auto-height">
              <Contact />
              <Footer />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </>
  );
}
