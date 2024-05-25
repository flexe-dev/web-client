export interface Colour {
  name: string;
  code: string;
}

const neutral: Array<Colour> = [
  { name: "neutral", code: "#D4D4D4" },
  { name: "neutral", code: "#A3A3A3" },
  { name: "neutral", code: "#737373" },
  { name: "neutral", code: "#525252" },
  { name: "neutral", code: "#404040" },
  { name: "neutral", code: "#262626" },
];
const slate: Array<Colour> = [
  { name: "slate", code: "#cbd5e1" },
  { name: "slate", code: "#94a3b8" },
  { name: "slate", code: "#64748b" },
  { name: "slate", code: "#475569" },
  { name: "slate", code: "#334155" },
  { name: "slate", code: "#1e293b" },
];
const red: Array<Colour> = [
  { name: "red", code: "#fca5a5" },
  { name: "red", code: "#f87171" },
  { name: "red", code: "#ef4444" },
  { name: "red", code: "#dc2626" },
  { name: "red", code: "#b91c1c" },
  { name: "red", code: "#991b1b" },
];
const yellow: Array<Colour> = [
  { name: "yellow", code: "#faf089" },
  { name: "yellow", code: "#facc15" },
  { name: "yellow", code: "#f59e0b" },
  { name: "yellow", code: "#d97706" },
  { name: "yellow", code: "#b45309" },
  { name: "yellow", code: "#92400e" },
];

const blue: Array<Colour> = [
  { name: "blue", code: "#93c5fd" },
  { name: "blue", code: "#60a5fa" },
  { name: "blue", code: "#3b82f6" },
  { name: "blue", code: "#2563eb" },
  { name: "blue", code: "#1d4ed8" },
  { name: "blue", code: "#1e40af" },
];
const green: Array<Colour> = [
  { name: "green", code: "#6ee7b7" },
  { name: "green", code: "#34d399" },
  { name: "green", code: "#10b981" },
  { name: "green", code: "#059669" },
  { name: "green", code: "#047857" },
  { name: "green", code: "#065f46" },
];
const purple: Array<Colour> = [
  { name: "purple", code: "#d4bcf9" },
  { name: "purple", code: "#c084fc" },
  { name: "purple", code: "#a855f7" },
  { name: "purple", code: "#9333ea" },
  { name: "purple", code: "#7e22ce" },
  { name: "purple", code: "#6b21a8" },
];

const colourSections = [
  "neutral",
  "slate",
  "red",
  "yellow",
  "blue",
  "green",
  "purple",
] as const;
export type ColourType = (typeof colourSections)[number];

export const colours: Record<ColourType, Array<Colour>> = {
  neutral,
  slate,
  red,
  yellow,
  blue,
  green,
  purple,
};
