import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node } from "../utils/DataStuctures";

interface StemState {
  nodes: Node<string>[];
}

const initialState: StemState = {
  nodes: [],
};

export const stemSlice = createSlice({
  name: "stem",
  initialState,
  reducers: {
    createNode: (state, action: PayloadAction<string>) => {
      const node = new Node(action.payload);
      state.nodes.push(node);
    },
    removeNode: (state, action) => {
      const index = state.nodes.findIndex((node) => node.id === action.payload);
      state.nodes.splice(index, 1);
    },
  },
});

export const { createNode, removeNode } = stemSlice.actions;
export default stemSlice.reducer;
