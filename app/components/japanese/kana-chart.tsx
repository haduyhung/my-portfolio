"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../../../i18n/navigation";
import type { Kana, ChartRow } from "../../constants/japanese";
import { VOWELS, getBasicChart, getDakutenChart } from "../../constants/japanese";

interface Props {
  title: string;
  subtitle: string;
  pool: Kana[];
  backHref?: string;
  embedded?: boolean;
}

export function KanaChart({ title, subtitle, pool, backHref, embedded = false }: Props) {
  const router = useRouter();
  const [showRomaji, setShowRomaji] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const basic   = useMemo(() => getBasicChart(pool),   [pool]);
  const dakuten = useMemo(() => getDakutenChart(pool), [pool]);
  const romajiMap = useMemo(
    () => new Map(pool.map((k) => [k.char, k.romaji])),
    [pool]
  );

  function handleCell(char: string) {
    setSelected((prev) => (prev === char ? null : char));
  }

  const selectedRomaji = selected ? romajiMap.get(selected) : null;

  const content = (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className={embedded ? "flex flex-col gap-0.5" : "flex flex-col items-center gap-1 text-center"}
      >
        <h2 className={embedded ? "text-xl font-bold" : "text-2xl font-bold"}>{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowRomaji((v) => !v)}
          className={`rounded-lg border px-4 py-1.5 text-sm transition-all ${
            showRomaji
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          {showRomaji ? "Ẩn romaji" : "Hiện romaji"}
        </button>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-1.5 text-sm"
          >
            <span className="text-xl font-light">{selected}</span>
            <span className="font-medium text-primary">
              {selectedRomaji?.join(" / ")}
            </span>
            <button
              onClick={() => setSelected(null)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </motion.div>
        )}
      </div>

      {/* Chart wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full overflow-x-auto"
      >
        <Section label="五十音 · Cơ bản">
          <ChartGrid rows={basic} romajiMap={romajiMap} showRomaji={showRomaji} selected={selected} onSelect={handleCell} />
        </Section>
        <Section label="濁音・半濁音 · Biến âm">
          <ChartGrid rows={dakuten} romajiMap={romajiMap} showRomaji={showRomaji} selected={selected} onSelect={handleCell} />
        </Section>
      </motion.div>

      {/* Footer */}
      <div className={embedded ? "flex items-center" : "flex flex-col items-center gap-2"}>
        <p className="text-xs text-muted-foreground">
          Click vào ký tự để xem romaji · Click lại để bỏ chọn
        </p>
        {!embedded && backHref && (
          <button
            onClick={() => router.push(backHref as any)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Quay lại luyện tập
          </button>
        )}
      </div>
    </>
  );

  if (embedded) {
    return <div className="flex flex-col gap-6">{content}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-6 py-12">
      {content}
    </div>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

// ── Chart grid ───────────────────────────────────────────────────────────────

interface GridProps {
  rows: ChartRow[];
  romajiMap: Map<string, string[]>;
  showRomaji: boolean;
  selected: string | null;
  onSelect: (char: string) => void;
}

function ChartGrid({ rows, romajiMap, showRomaji, selected, onSelect }: GridProps) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      {/* Vowel header */}
      <div className="grid grid-cols-6 bg-secondary/50">
        <div className="flex items-center justify-center py-2 text-xs text-muted-foreground" />
        {VOWELS.map((v) => (
          <div key={v} className="flex items-center justify-center py-2 text-xs font-semibold text-muted-foreground uppercase">
            {v}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, ri) => (
        <div
          key={ri}
          className="grid grid-cols-6 border-t border-border"
        >
          {/* Consonant label */}
          <div className="flex items-center justify-center bg-secondary/30 py-1 text-xs font-semibold text-muted-foreground uppercase">
            {row.label || "∅"}
          </div>

          {/* Cells */}
          {row.chars.map((char, ci) => {
            if (!char) {
              return (
                <div
                  key={ci}
                  className="border-l border-border bg-secondary/10"
                />
              );
            }

            const romaji = romajiMap.get(char);
            const isSelected = selected === char;

            return (
              <button
                key={ci}
                onClick={() => onSelect(char)}
                className={`flex flex-col items-center justify-center gap-0.5 border-l border-border py-3 transition-all hover:bg-primary/10 ${
                  isSelected ? "bg-primary/15 ring-1 ring-inset ring-primary/40" : ""
                }`}
              >
                <span className={`text-2xl font-light leading-none transition-all ${isSelected ? "text-primary" : ""}`}>
                  {char}
                </span>
                {showRomaji && romaji && (
                  <span className="text-[10px] text-muted-foreground leading-none mt-1">
                    {romaji[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
