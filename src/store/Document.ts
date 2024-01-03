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
          const index = parent.children.findIndex(
            (node) => node.id === activeNode?.id
          );
          parent.children.splice(index + 1, 0, node);
        }
      } else {
        const index = state.nodes.findIndex(
          (node) => node.id === activeNode?.id
        );
        state.nodes.splice(index + 1, 0, node);
      }
      state.activeNodeId = node.id;
    },
    //Add Above Active
    createNodeAbove: (state, { payload }) => {
      const node = buildNode(payload);
      const activeNode = getNodeById(state.nodes, state.activeNodeId!);
      if (activeNode?.parent_id) {
        const parent = getNodeById(state.nodes, activeNode.parent_id);
        if (parent) {
          node.parent_id = parent.id;
          const index = parent.children.findIndex(
            (node) => node.id === activeNode?.id
          );
          parent.children.splice(index, 0, node);
        }
      } else {
        const index = state.nodes.findIndex(
          (node) => node.id === activeNode?.id
        );
        state.nodes.splice(index, 0, node);
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
    editNodeData: (state, { payload }) => {
      const node = getNodeById(state.nodes, state.activeNodeId!);
      if (node) {
        node.content = payload;
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

  depthFirstSearch(nodes, (node, depth) => {
    if (!branches[depth]) branches[depth] = [];
    branches[depth].push(node);
  });

  return branches;
});

export const {
  createNode,
  createNodeAbove,
  removeNode,
  setActiveNode,
  createChildNode,
  editNodeData,
} = documentSlice.actions;
export default documentSlice.reducer;
