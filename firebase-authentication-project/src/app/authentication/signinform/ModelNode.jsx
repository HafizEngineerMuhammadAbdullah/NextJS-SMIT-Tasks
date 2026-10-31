"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

// Handles are the "plugs" edges attach to. Pinning them to the exact centre of
// the tile and hiding them makes every line run from centre to centre, so the
// diagonals meet the hub cleanly. The tile itself covers the line ends.
const centerHandle = {
  top: "50%",
  left: "50%",
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
  border: 0,
  background: "transparent",
  opacity: 0,
  pointerEvents: "none",
};

const TILE_BASE =
  "relative pointer-events-auto flex items-center justify-center transition-transform duration-200 hover:scale-110";

const TILE_STYLES = {
  light: "h-[52px] w-[52px] rounded-2xl bg-white border border-gray-200 shadow-sm",
  dark: "h-[52px] w-[52px] rounded-2xl bg-neutral-950 border border-neutral-800 shadow-md",
  hub: "h-[76px] w-[76px] rounded-[22px] bg-linear-to-b from-neutral-700 to-neutral-950 border border-neutral-800 shadow-xl shadow-black/25",
};

function ModelNode({ data }) {
  const { Icon, label, tone = "light", color, isHub } = data;

  const variant = isHub ? "hub" : tone;
  const iconColor = variant === "light" ? color : "#ffffff";

  return (
    <div title={label} className={`${TILE_BASE} ${TILE_STYLES[variant]}`}>
      <Handle type="target" position={Position.Top} id="in" isConnectable={false} style={centerHandle} />
      <Handle type="source" position={Position.Top} id="out" isConnectable={false} style={centerHandle} />

      <Icon size={isHub ? 34 : 24} color={iconColor} aria-label={label} />
    </div>
  );
}

export default memo(ModelNode);
