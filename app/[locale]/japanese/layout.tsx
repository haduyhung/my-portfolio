"use client";

import { useState } from "react";
import { JapaneseSidebar } from "../../components/japanese/japanese-sidebar";
import { JapaneseHeader } from "../../components/japanese/japanese-header";

export default function JapaneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <JapaneseSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col md:pl-60">
        <JapaneseHeader onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
