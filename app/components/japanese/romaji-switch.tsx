"use client";

interface RomajiSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function RomajiSwitch({ checked, onCheckedChange }: RomajiSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span>Hiện Romaji</span>
      <span
        aria-hidden="true"
        className={`inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${checked ? "border-primary bg-primary" : "border-border bg-secondary"}`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </span>
    </button>
  );
}
