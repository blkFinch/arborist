import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Node } from "../utils/DataStuctures";

interface DocumentState {
  title: string;
  nodes: NodeState[];
  activeNodeId: string | null;
}

export interface NodeState {
  id: string;
  prev: string | null; //deprecated
  next: string | null; //deprecated
  children: string[];
  data: string;
}

const initialState: DocumentState = {
  nodes: [],
  activeNodeId: null,
  title: "Untitled",
};

export const documentSlice = createSlice({
  name: "stem",
  initialState,
  reducers: {
    createNode: (state, action) => {
      const node = new Node(action.payload);
      const nodeData: NodeState = node.getData();
      state.activeNodeId = nodeData.id;
      state.nodes.push(nodeData);
    },
    removeNode: (state, action) => {
      const index = state.nodes.findIndex((node) => node.id === action.payload);
      const prevNode = state.nodes[index - 1];
      state.nodes.splice(index, 1);
      state.activeNodeId = prevNode?.id || null;
    },
    setActiveNode: (state, action) => {
      state.activeNodeId = action.payload;
    },
    createChildNode: (state, action) => {
      const node = new Node(action.payload);
      const nodeData: NodeState = node.getData();
      const index = state.nodes.findIndex(
        (node) => node.id === state.activeNodeId
      );
      state.nodes[index].children.push(JSON.stringify(nodeData));
    },
  },
});

const selectNodes = (state: DocumentState) => state.nodes;

export const selectBranches = createSelector(selectNodes, (nodes) => {
  const branches: NodeState[][] = [];

  function dfs(node: NodeState, depth: number) {
    if (branches[depth] === undefined) branches[depth] = [];
    branches[depth].push(node);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const childNode: NodeState = JSON.parse(child);
        dfs(childNode, depth + 1);
      });
    }
  }

  nodes.forEach((node) => {
    dfs(node, 0);
  });

  return branches;
});

export const { createNode, removeNode, setActiveNode, createChildNode } =
  documentSlice.actions;
export default documentSlice.reducer;
