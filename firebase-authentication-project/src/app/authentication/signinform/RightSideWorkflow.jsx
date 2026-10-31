"use client";

import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import ModelNode from "./ModelNode";
import { initialNodes, initialEdges, edgeOptions } from "./flowConfig";

// Keep these OUTSIDE the component. If React Flow receives a new object on every
// render it re-registers everything and warns in the console.
const nodeTypes = { model: ModelNode };
const NODE_ORIGIN = [0.5, 0.5]; // position = centre of the tile, not its top-left corner
const FIT_VIEW_OPTIONS = { padding: 0.35 };
const PRO_OPTIONS = { hideAttribution: true };

export default function RightSideWorkflow() {
  return (
    <section className="hidden min-h-screen flex-1 flex-col items-center justify-center border-l border-gray-200 bg-[#f8f9fb] px-8 lg:flex">
      {/* Heading block */}
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Select & Combine & Integrate.
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Develop and refine AI models using our intuitive interface.
        </p>
      </div>

      {/* React Flow needs a parent with a real width AND height, otherwise it renders blank */}
      <div className="mt-10 h-[440px] w-full max-w-xl">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={edgeOptions}
          nodeOrigin={NODE_ORIGIN}
          fitView
          fitViewOptions={FIT_VIEW_OPTIONS}
          proOptions={PRO_OPTIONS}
          colorMode="light"
          /* Make it a static illustration: no drag, zoom, pan, select or connect */
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1.5} color="#e2e8f0" />
        </ReactFlow>
      </div>
    </section>
  );
}
