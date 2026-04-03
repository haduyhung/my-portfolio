"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../../../i18n/navigation";

const PASSWORD = "051020";

export default function SecretPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") === "1") {
      router.replace("/japanese" as any);
    }
  }, [router]);

  const handleLogin = () => {
    if (value === PASSWORD) {
      sessionStorage.setItem("jp_auth", "1");
      router.push("/japanese" as any);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xs"
      >
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mb-2 text-3xl">🔐</div>
            <h1 className="text-lg font-semibold">Đăng nhập</h1>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Mật khẩu"
              autoFocus
              className={`w-full rounded-lg border px-4 py-2.5 text-center text-sm outline-none transition-colors bg-background ${
                error ? "border-red-500" : "border-border focus:border-primary"
              }`}
            />
            {error && (
              <p className="text-center text-xs text-red-500">
                Mật khẩu không đúng
              </p>
            )}
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
