import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  Node,
  buildNode,
  depthFirstSearch,
  filterNodesById,
  getNodeById,
} from "../utils/nodeHelpers";

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
  name: "document",
  initialState,
  reducers: {
    //Add Below Active
    createNode: (state, { payload }) => {
      const node = buildNode(payload);
      const activeNode = getNodeById(state.nodes, state.activeNodeId!);
      if (activeNode?.parent_id) {
        const parent = getNodeById(state.nodes, activeNode.parent_id);
        if (parent) {
          node.parent_id = parent.id;
          parent.children.push(node);
        }
      } else {
        state.nodes.push(node);
      }
      state.activeNodeId = node.id;
    },
    removeNode: (state, { payload }) => {
      state.nodes = [...filterNodesById(state.nodes, payload)];
    },
    setActiveNode: (state, { payload }) => {
      state.activeNodeId = payload;
    },
    //Add to right of active
    createChildNode: (state, { payload }) => {
      const node = buildNode(payload);
      const parent = getNodeById(state.nodes, state.activeNodeId!);
      if (parent) {
        node.parent_id = parent.id;
        parent.children.push(node);
      }
    },
  },
});

const selectNodes = (state: DocumentState) => state.nodes;

// Selectors are used to get derived data from the store
//
// This returns all the nodes as an array of columns
export const selectBranches = createSelector(selectNodes, (nodes) => {
  const branches: Node[][] = [];

  nodes.forEach((node) => {
    depthFirstSearch([node], (node, depth) => {
      if (!branches[depth]) branches[depth] = [];
      branches[depth].push(node);
    });
  });

  return branches;
});

export const { createNode, removeNode, setActiveNode, createChildNode } =
  documentSlice.actions;
export default documentSlice.reducer;
