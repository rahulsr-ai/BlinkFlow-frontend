import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, ReactFlow } from "@xyflow/react"
import { useCallback, useState } from "react"
import '@xyflow/react/dist/style.css';
import { edgeTypes, initialEdges, initialNodes, nodeTypes } from "./nodes/nodes";



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
      <div className="w-screen h-screen  flex flex-col">
        {/* Header ko absolute rakho taki flow ke upar dikhe */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none  w-full text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide l  ">
            BlinkFlow <span className="text-green-500">AI</span>
          </h1>
        </div>

        {/* ReactFlow hi nodes ko render karega */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes} // Yahan edgeTypes pass karna zaruri hai
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect} // Connection functionality
          fitView
        >

          <Background variant={BackgroundVariant.Lines}/> 
          <Controls/>

          {/* Background aur Controls yahan aayenge */}
        </ReactFlow>
      </div>


    </>
  )
}

export default App



/* 

 return (
    <>
         
          

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} color="blue" gap={44} />
        <Controls />
      </ReactFlow>
    </>
  )
    
*/