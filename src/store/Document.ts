import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Node, buildNode, filterNodesById, getNodeById } from "../utils/Node";

interface DocumentState {
  title: string;
  nodes: Node[];
  activeNodeId: string | null;
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
      const node = buildNode(action.payload);
      state.activeNodeId = node.id;
      state.nodes.push(node);
    },
    removeNode: (state, action) => {
      const filteredNodes: Node[] = filterNodesById(
        state.nodes,
        action.payload
      );
      state.nodes = filteredNodes;
    },
    setActiveNode: (state, action) => {
      state.activeNodeId = action.payload;
    }, //TODO: createChildNode needs to use dfs to add child to child
    createChildNode: (state, action) => {
      const node = buildNode(action.payload);
      const parent = getNodeById(state.nodes, state.activeNodeId!);
      if (parent) parent.children.push(node);
    },
  },
});

const selectNodes = (state: DocumentState) => state.nodes;

// Selectors are used to get derived data from the store
//
// This returns all the nodes as an array of columns
export const selectBranches = createSelector(selectNodes, (nodes) => {
  const branches: Node[][] = [];

  // performs depth-first search on the tree and adds node
  // to column corresponding to its depth
  function dfs(node: Node, depth: number) {
    if (branches[depth] === undefined) branches[depth] = [];
    branches[depth].push(node);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const childNode: Node = child;
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
