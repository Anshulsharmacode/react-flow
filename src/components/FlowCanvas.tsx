"use client";

import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import WelcomeNode from "./nodes/WelcomeNode";
import PreferencesNode from "./nodes/PreferencesNode";
import CustomizeNode from "./nodes/CustomizeNode";
import SummaryNode from "./nodes/SummaryNode";
import React from "react";

const nodeTypes = {
  welcomeNode: WelcomeNode,
  preferencesNode: PreferencesNode,
  customizeNode: CustomizeNode,
  summaryNode: SummaryNode,
};

// Add this function at the top level
const getNodeHeight = (nodeType: string): number => {
  switch (nodeType) {
    case "welcomeNode":
      return 600; // Welcome node height
    case "preferencesNode":
      return 600; // Preferences node height
    case "customizeNode":
      return 800; // Customize node height (larger due to more content)
    case "summaryNode":
      return 800; // Summary node height
    default:
      return 400;
  }
};

// Modify the getInitialNodes function
const getInitialNodes = () => {
  const centerX = window.innerWidth / 2;
  const verticalGap = 100; // Gap between nodes

  // Calculate positions with variable heights
  let currentY = 50; // Starting Y position

  const nodes = [
    {
      id: "1",
      type: "welcomeNode",
      position: { x: centerX - 225, y: currentY },
      data: { label: "Welcome" },
      style: { width: Math.min(450, window.innerWidth - 40) },
    },
  ];

  // Add remaining nodes with dynamic positioning
  ["preferencesNode", "customizeNode", "summaryNode"].forEach((type, index) => {
    // Add the previous node's height plus gap to get the new Y position
    currentY += getNodeHeight(nodes[index].type) + verticalGap;

    nodes.push({
      id: (index + 2).toString(),
      type,
      position: { x: centerX - 225, y: currentY },
      data: { label: type.replace("Node", "") },
      style: { width: Math.min(450, window.innerWidth - 40) },
    });
  });

  return nodes;
};

// Add labels to edges with improved routing and animations
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    label: "Next Step",
    style: { stroke: "#000", strokeWidth: 3 },
    labelStyle: { fill: "#000", fontWeight: 600 },
    type: "smoothstep",
    selected: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    label: "Customize",
    style: { stroke: "#000", strokeWidth: 3 },
    labelStyle: { fill: "#000", fontWeight: 600 },
    type: "smoothstep",
    selected: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "Review",
    style: { stroke: "#000", strokeWidth: 3 },
    labelStyle: { fill: "#000", fontWeight: 600 },
    type: "smoothstep",
    selected: true,
  },
];

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}

function FlowContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { getNode, setCenter } = useReactFlow();

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

    // Expose scrollToNode function to window for access from other components
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (window as any).scrollToNode = (nodeId: string) => {
      const node = getNode(nodeId);

      if (node) {
        // Get the node's height and calculate vertical center offset
        const nodeHeight = getNodeHeight(node.type || "");
        const verticalOffset = nodeHeight / 2;

        setCenter(
          node.position.x + 225, // Horizontal center
          node.position.y + verticalOffset - 100, // Vertical center considering node height
          {
            duration: 800,
            zoom: 1,
          }
        );
      }
    };
  }, [setNodes, setEdges, getNode, setCenter]);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setNodes(getInitialNodes());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
