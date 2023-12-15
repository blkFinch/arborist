import { createSlice } from "@reduxjs/toolkit";
import { Node } from "../utils/DataStuctures";

//DEPRECATED use document instead
interface StemState {
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

const initialState: StemState = {
  nodes: [],
  activeNodeId: null,
};

export const stemSlice = createSlice({
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
  },
});

export const { createNode, removeNode, setActiveNode } = stemSlice.actions;
export default stemSlice.reducer;
