import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, ReactFlow } from "@xyflow/react"
import { useCallback, useState } from "react"
import '@xyflow/react/dist/style.css';
import { edgeTypes, initialEdges, initialNodes, nodeTypes } from "./nodes/nodes";
import { ToastContainer } from 'react-toastify';


const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);


  const onNodesChange = useCallback(
    (changes: any[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );


  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );


  return (
    <>
      <div className="w-screen h-screen flex flex-col">

        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none  w-full text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide l  ">
            BlinkFlow <span className="text-green-500">AI</span>
          </h1>
        </div>

        {/* Render ReactFlow nodes */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect} 
          fitView
        >

          <Background variant={BackgroundVariant.Lines} />
          <Controls />


        </ReactFlow>
      </div>

      <ToastContainer />
    </>
  )
}

export default App