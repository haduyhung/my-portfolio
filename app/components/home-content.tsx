"use client";

import ReactFullpage from "@fullpage/react-fullpage";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Header } from "./header";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Skills } from "./sections/skills";
import { Experience } from "./sections/experience";
import { Projects } from "./sections/projects";
import { Contact } from "./sections/contact";
import { Footer } from "./footer";

export function HomeContent() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  return (
    <>
      <Header />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => (window as Window & { fullpage_api?: { moveTo: (n: number) => void } }).fullpage_api?.moveTo(1)}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
      <ReactFullpage
        licenseKey="gplv3-license"
        credits={{ enabled: true }}
        scrollingSpeed={800}
        navigation
        navigationPosition="right"
        scrollOverflow
        onLeave={(_origin, destination) => {
          setShowScrollTop(destination.index >= 3);
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
