export interface Colour {
  name: string;
  code: string;
}

const neutral: Array<Colour> = [
  { name: "neutral-300", code: "#D4D4D4" },
  { name: "neutral-400", code: "#A3A3A3" },
  { name: "neutral-500", code: "#737373" },
  { name: "neutral-600", code: "#525252" },
  { name: "neutral-700", code: "#404040" },
  { name: "neutral-800", code: "#262626" },
];
const slate: Array<Colour> = [
  { name: "slate-300", code: "#cbd5e1" },
  { name: "slate-400", code: "#94a3b8" },
  { name: "slate-500", code: "#64748b" },
  { name: "slate-600", code: "#475569" },
  { name: "slate-700", code: "#334155" },
  { name: "slate-800", code: "#1e293b" },
];
const red: Array<Colour> = [
  { name: "red-300", code: "#fca5a5" },
  { name: "red-400", code: "#f87171" },
  { name: "red-500", code: "#ef4444" },
  { name: "red-600", code: "#dc2626" },
  { name: "red-700", code: "#b91c1c" },
  { name: "red-800", code: "#991b1b" },
];
const yellow: Array<Colour> = [
  { name: "yellow-300", code: "#faf089" },
  { name: "yellow-400", code: "#facc15" },
  { name: "yellow-500", code: "#f59e0b" },
  { name: "yellow-600", code: "#d97706" },
  { name: "yellow-700", code: "#b45309" },
  { name: "yellow-800", code: "#92400e" },
];

const blue: Array<Colour> = [
  { name: "blue-300", code: "#93c5fd" },
  { name: "blue-400", code: "#60a5fa" },
  { name: "blue-500", code: "#3b82f6" },
  { name: "blue-600", code: "#2563eb" },
  { name: "blue-700", code: "#1d4ed8" },
  { name: "blue-800", code: "#1e40af" },
];
const green: Array<Colour> = [
  { name: "green-300", code: "#6ee7b7" },
  { name: "green-400", code: "#34d399" },
  { name: "green-500", code: "#10b981" },
  { name: "green-600", code: "#059669" },
  { name: "green-700", code: "#047857" },
  { name: "green-800", code: "#065f46" },
];
const purple: Array<Colour> = [
  { name: "purple-300", code: "#d4bcf9" },
  { name: "purple-400", code: "#c084fc" },
  { name: "purple-500", code: "#a855f7" },
  { name: "purple-600", code: "#9333ea" },
  { name: "purple-700", code: "#7e22ce" },
  { name: "purple-800", code: "#6b21a8" },
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
