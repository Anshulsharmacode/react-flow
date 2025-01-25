'use client';

import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

import WelcomeNode from './nodes/WelcomeNode';
import PreferencesNode from './nodes/PreferencesNode';
import CustomizeNode from './nodes/CustomizeNode';
import SummaryNode from './nodes/SummaryNode';
import React from 'react';

const nodeTypes = {
  welcomeNode: WelcomeNode,
  preferencesNode: PreferencesNode,
  customizeNode: CustomizeNode,
  summaryNode: SummaryNode,
};

// Responsive node positioning based on screen width with improved spacing
const getInitialNodes = () => {
  const baseX = window.innerWidth < 768 ? 100 : 400;
  const verticalGap = 350; // Increased vertical spacing between nodes
  const horizontalOffset = 600; // Horizontal offset for alternating pattern
  
  return [
    {
      id: '1',
      type: 'welcomeNode',
      position: { x: baseX, y: 0 },
      data: { label: 'Welcome' },
      style: { width: Math.min(450, window.innerWidth - 40) }
    },
    {
      id: '2',
      type: 'preferencesNode', 
      position: { x: baseX + horizontalOffset, y: verticalGap },
      data: { label: 'Preferences' },
      style: { width: Math.min(450, window.innerWidth - 40) }
    },
    {
      id: '3',
      type: 'customizeNode',
      position: { x: baseX, y: verticalGap * 2 },
      data: { label: 'Customize' },
      style: { width: Math.min(450, window.innerWidth - 40) }
    },
    {
      id: '4', 
      type: 'summaryNode',
      position: { x: baseX + horizontalOffset, y: verticalGap * 3 },
      data: { label: 'Summary' },
      style: { width: Math.min(450, window.innerWidth - 40) }
    },
  ];
};

// Add labels to edges with improved routing and animations
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    label: 'Next Step',
    style: { stroke: '#000', strokeWidth: 3 },
    labelStyle: { fill: '#000', fontWeight: 600 },
    type: 'smoothstep',
    selected: true
  },
  {
    id: 'e2-3',
    source: '2', 
    target: '3',
    animated: true,
    label: 'Customize',
    style: { stroke: '#000', strokeWidth: 3 },
    labelStyle: { fill: '#000', fontWeight: 600 },
    type: 'smoothstep',
    selected: true
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true, 
    label: 'Review',
    style: { stroke: '#000', strokeWidth: 3 },
    labelStyle: { fill: '#000', fontWeight: 600 },
    type: 'smoothstep',
    selected: true
  },
];

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Add nodes one by one with animation
  React.useEffect(() => {
    const initialNodes = getInitialNodes();
    const initialEdgesList = initialEdges;
    
    // Add nodes with delay
    initialNodes.forEach((node, index) => {
      setTimeout(() => {
        setNodes((nds) => [...nds, node]);
        // Add edge after both connected nodes are present
        if (index > 0) {
          setEdges((eds) => [...eds, initialEdgesList[index - 1]]);
        }
      }, index * 800); // 800ms delay between each node
    });
  }, [setNodes, setEdges]);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setNodes(getInitialNodes());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setNodes]);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        minZoom={0.3}
        maxZoom={1.5}
        fitView
        fitViewOptions={{ padding: 0.3 }} 
      >
        <Background color="#000" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}