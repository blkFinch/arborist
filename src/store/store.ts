import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./Document.ts";

const store = configureStore({
  reducer: {
    document: documentReducer,
  },
  devTools: true,
});

// Getting types as per https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
