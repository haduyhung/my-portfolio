"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "../../../i18n/navigation";
import { BOOK_RANGES } from "../../constants/minna";

const LESSON_COUNT = 50;

const lessons = Array.from({ length: LESSON_COUNT }, (_, i) => i + 1);

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-xl w-72"
      >
        <p className="font-medium text-center">Đăng xuất?</p>
        <p className="mt-1 text-sm text-muted-foreground text-center">
          Bạn sẽ cần nhập mật khẩu lại để vào lại.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border py-2 text-sm transition-colors hover:bg-secondary"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-destructive py-2 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
          >
            Đăng xuất
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface JapaneseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JapaneseSidebar({ isOpen, onClose }: JapaneseSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [kanaOpen, setKanaOpen] = useState(
    pathname.includes("/japanese/hiragana") || pathname.includes("/japanese/katakana")
  );
  const [minnaOpen, setMinnaOpen] = useState(pathname.includes("/japanese/minna"));
  const [numbersOpen, setNumbersOpen] = useState(pathname.includes("/japanese/numbers"));
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jp_auth");
    router.push("/" as any);
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-card transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo + back */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-4">
          <button
            onClick={() => router.push("/" as any)}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            aria-label="Về trang chủ"
          >
            <ArrowLeft size={18} />
            <Image
              src="/logo.png"
              alt="HDH Logo"
              width={32}
              height={32}
              style={{ width: 32, height: 32 }}
              className="object-contain"
            />
          </button>
          <span className="ml-auto text-xs text-muted-foreground">日本語</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {/* Bảng chữ cái */}
          <div className="mb-1">
            <button
              onClick={() => setKanaOpen((v: boolean) => !v)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                (isActive("/japanese/hiragana") || isActive("/japanese/katakana"))
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              <span>Bảng chữ cái</span>
              <motion.span
                animate={{ rotate: kanaOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground"
              >
                <ChevronRight size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {kanaOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                    {[
                      { label: "Hiragana", href: "/japanese/hiragana" },
                      { label: "Katakana", href: "/japanese/katakana" },
                    ].map((item) => (
                      <button
                        key={item.href}
                        onClick={() => router.push(item.href as any)}
                        className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                          isActive(item.href)
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Số đếm */}
          <div className="mb-1">
            <button
              onClick={() => setNumbersOpen((v: boolean) => !v)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                isActive("/japanese/numbers") ? "text-primary" : "text-foreground"
              }`}
            >
              <span>Số đếm</span>
              <motion.span
                animate={{ rotate: numbersOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground"
              >
                <ChevronRight size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {numbersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                    {[
                      { id: 1, label: "Số cơ bản" },
                      { id: 2, label: "Đơn vị đếm" },
                      { id: 3, label: "Số thuần Nhật" },
                    ].map((item) => {
                      const href = `/japanese/numbers/${item.id}`;
                      return (
                        <button
                          key={item.id}
                          onClick={() => router.push(href as any)}
                          className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                            isActive(href)
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Minna no Nihongo */}
          <div className="mb-1">
            <button
              onClick={() => setMinnaOpen((v: boolean) => !v)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                isActive("/japanese/minna") ? "text-primary" : "text-foreground"
              }`}
            >
              <span>Minna no Nihongo</span>
              <motion.span
                animate={{ rotate: minnaOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground"
              >
                <ChevronRight size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {minnaOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 mt-1 border-l border-border pl-3">
                    {([1, 2] as const).map((book) => {
                      const { start, end } = BOOK_RANGES[book];
                      return (
                        <div key={book} className="mb-2">
                          <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Quyển {book}
                          </p>
                          <div className="flex flex-col gap-0.5">
                            {lessons
                              .filter((n) => n >= start && n <= end)
                              .map((n) => {
                                const href = `/japanese/minna/${n}`;
                                return (
                                  <button
                                    key={n}
                                    onClick={() => router.push(href as any)}
                                    className={`rounded-md px-3 py-1 text-left text-sm transition-colors ${
                                      isActive(href)
                                        ? "bg-primary/10 font-medium text-primary"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                                  >
                                    Bài {n}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <button
            onClick={() => setShowLogout(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut size={15} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {showLogout && (
        <ConfirmDialog
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  );
}
