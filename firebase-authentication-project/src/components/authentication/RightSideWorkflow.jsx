"use client";

import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 1. Define the custom styling for our Nodes
const hubNodeStyle = {
  background: '#3b82f6', // Tailwind blue-500
  color: '#fff',
  padding: '20px',
  borderRadius: '9999px',
  fontWeight: 'bold',
  border: '4px solid #1d4ed8',
  boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
  textAlign: 'center',
  width: 120,
  height: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const toolNodeStyle = {
  background: '#ffffff',
  color: '#1f2937', // Tailwind gray-800
  padding: '12px 18px',
  borderRadius: '12px',
  border: '2px solid #e5e7eb',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  fontWeight: '600',
  fontSize: '14px',
  textAlign: 'center',
  width: 140,
};

// 2. Define the Nodes and their 3x3 geometric grid coordinates
const initialNodes = [
  // Central Hub Node placed exactly at the origin (Center)
  {
    id: 'center-hub',
    data: { label: 'AI Central Hub' },
    position: { x: 200, y: 200 },
    style: hubNodeStyle,
  },
  // Top 3 Nodes
  { id: 'tool-1', data: { label: 'ChatGPT' }, position: { x: 0, y: 0 }, style: toolNodeStyle },
  { id: 'tool-2', data: { label: 'Claude AI' }, position: { x: 200, y: -50 }, style: toolNodeStyle },
  { id: 'tool-3', data: { label: 'Midjourney' }, position: { x: 400, y: 0 }, style: toolNodeStyle },
  // Middle Row Left & Right
  { id: 'tool-4', data: { label: 'v0.dev' }, position: { x: -50, y: 235 }, style: toolNodeStyle },
  { id: 'tool-5', data: { label: 'Gemini' }, position: { x: 450, y: 235 }, style: toolNodeStyle },
  // Bottom 3 Nodes
  { id: 'tool-6', data: { label: 'Firebase' }, position: { x: 0, y: 450 }, style: toolNodeStyle },
  { id: 'tool-7', data: { label: 'Redux Toolkit' }, position: { x: 200, y: 500 }, style: toolNodeStyle },
  { id: 'tool-8', data: { label: 'Tailwind CSS' }, position: { x: 400, y: 450 }, style: toolNodeStyle },
];

// 3. Define the Edges (Connections) with dotted/dashed properties
const initialEdges = [
  { id: 'e1', source: 'center-hub', target: 'tool-1', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e2', source: 'center-hub', target: 'tool-2', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e3', source: 'center-hub', target: 'tool-3', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e4', source: 'center-hub', target: 'tool-4', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e5', source: 'center-hub', target: 'tool-5', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e6', source: 'center-hub', target: 'tool-6', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e7', source: 'center-hub', target: 'tool-7', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
  { id: 'e8', source: 'center-hub', target: 'tool-8', animated: true, style: { strokeDasharray: '5,5', stroke: '#9ca3af' } },
];

const RightSideWorkflow = () => {
  return (
    <div className="w-full h-full min-h-[500px] bg-slate-50 relative rounded-2xl overflow-hidden border border-slate-200">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesDraggable={true} // Set to false if you want it completely locked and static
        nodesConnectable={false}
        zoomOnScroll={false}
        preventScrolling={false}
      >
        {/* Adds a fine-grained dot background grid matching your design requirement */}
        <Background color="#cbd5e1" gap={16} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}


export default RightSideWorkflow;
