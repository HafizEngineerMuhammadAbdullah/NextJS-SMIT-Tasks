"use client"
// import React from 'react'
// import { useState, useCallback } from 'react';
// import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
// import { Background, Controls } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

import RightSideWorkflow from "@/app/authentication/signinform/RightSideWorkflow"


// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
//   { id: 'n3', position: { x: 100, y: 100 }, data: { label: 'Node 3' } },
// ];


// const initialNodes = [
//   {
//     id: 'n1',
//     position: { x: 0, y: 0 },
//     data: { label: 'Node 1' },
//     type: 'input',
//   },
//   {
//     id: 'n2',
//     position: { x: 100, y: 100 },
//     data: { label: 'Node 2' },
//     type: 'output',
//   },
// ];

// const initialEdges = [{
//   id: 'n1-n2', source: 'n1', target: 'n2', type: 'smoothstep',
//   label: 'connects with',
// }];
const RightPanel = () => {

  //   const [nodes, setNodes] = useState(initialNodes);
  //   const [edges, setEdges] = useState(initialEdges);

  //   const onNodesChange = useCallback((changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  //   const onEdgesChange = useCallback((changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  //   const onConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);



  return (
    <div className='flex flex-1 flex-col items-center px-4 py-5 bg-gray-100/60 border-l border-l-black/40'>
      {/* Top Side */}
      <div className='space-y-1.5 mt-3.5 text-center'>
        <h1 className='text-xl font-bold text-black'>Select & Combine & Integrate</h1>
        <p className='text-base font-medium text-gray-400'>Develop & refine AI models using our intuitive interface</p>
      </div>


       {/* <div className="hidden lg:flex items-center justify-center p-8 bg-slate-100"> */}
        {/* <RightSideWorkflow /> */}
      {/* </div> */}
      {/* <div style={{ width: '100vw', height: '75vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      </div> */}

      {/* <div style={{ height: '100%', width: '100%' }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div> */}

    </div>
  )
}

export default RightPanel
