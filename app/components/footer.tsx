"use client";

import { PERSONAL_INFO } from "../constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
        </p>
        <p>
          Built with{" "}
          <span className="font-medium text-foreground">Next.js</span>,{" "}
          <span className="font-medium text-foreground">Tailwind CSS</span> &{" "}
          <span className="font-medium text-foreground">Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
