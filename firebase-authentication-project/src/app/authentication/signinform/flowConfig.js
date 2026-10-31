import {
  SiMeta,
  SiReplit,
  SiPerplexity,
  SiAnthropic,
  SiVercel,
  SiGooglegemini,
  SiFirebase,
} from "react-icons/si";
import { AiOutlineOpenAI } from "react-icons/ai";
import { LuSmile } from "react-icons/lu";

/* ------------------------------------------------------------------ */
/* 1. DATA — the only place you edit to change logos, tones or order   */
/* ------------------------------------------------------------------ */

// distance between grid columns / rows, in pixels
const GAP = 130;

// The 8 outer tiles. col/row place each one on a 3x3 grid (0, 1, 2).
// tone "light" = white tile, tone "dark" = black tile.
const OUTER_MODELS = [
  { id: "meta",       label: "Meta",       col: 0, row: 0, Icon: SiMeta,         tone: "light", color: "#0866FF" },
  { id: "replit",     label: "Replit",     col: 1, row: 0, Icon: SiReplit,       tone: "dark" },
  { id: "perplexity", label: "Perplexity", col: 2, row: 0, Icon: SiPerplexity,   tone: "light", color: "#20808D" },

  { id: "claude",     label: "Claude",     col: 0, row: 1, Icon: SiAnthropic,    tone: "dark" },
  { id: "v0",         label: "v0",         col: 2, row: 1, Icon: SiVercel,       tone: "dark" },

  { id: "chatgpt",    label: "ChatGPT",    col: 0, row: 2, Icon: AiOutlineOpenAI,       tone: "light", color: "#10A37F" },
  { id: "gemini",     label: "Gemini",     col: 1, row: 2, Icon: SiGooglegemini, tone: "dark" },
  { id: "firebase",   label: "Firebase",   col: 2, row: 2, Icon: SiFirebase,     tone: "light", color: "#FFA000" },
];

const HUB = { id: "hub", label: "AI Labs", col: 1, row: 1, Icon: LuSmile };

/* ------------------------------------------------------------------ */
/* 2. NODES — turn the plain data above into React Flow node objects   */
/* ------------------------------------------------------------------ */

const toNode = (item, isHub = false) => ({
  id: item.id,
  type: "model", // must match a key inside `nodeTypes` in RightPanel.jsx
  position: { x: item.col * GAP, y: item.row * GAP },
  data: { ...item, isHub },
});

export const initialNodes = [...OUTER_MODELS.map((m) => toNode(m)), toNode(HUB, true)];

/* ------------------------------------------------------------------ */
/* 3. EDGES — generated, never typed by hand                           */
/* ------------------------------------------------------------------ */

// Walk around the square clockwise. Each tile connects to the next one.
const RING = ["meta", "replit", "perplexity", "v0", "firebase", "gemini", "chatgpt", "claude"];

const ringEdges = RING.map((id, i) => ({
  id: `ring-${id}`,
  source: id,
  target: RING[(i + 1) % RING.length], // the % closes the loop back to "meta"
}));

// Every outer tile also connects to the hub (4 straight + 4 diagonal lines).
const spokeEdges = RING.map((id) => ({
  id: `spoke-${id}`,
  source: "hub",
  target: id,
}));

export const initialEdges = [...ringEdges, ...spokeEdges];

// Shared look for all 16 edges: tiny round dots instead of a dashed line.
export const edgeOptions = {
  type: "straight",
  focusable: false,
  style: {
    stroke: "#b8c0cc",
    strokeWidth: 2,
    strokeDasharray: "0.1 7",
    strokeLinecap: "round",
  },
};
