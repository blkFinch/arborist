import { configureStore } from "@reduxjs/toolkit";
import stemReducer from "./Stem.ts";

//TODO: extract and define in store.ts
const store = configureStore({
  reducer: {
    stem: stemReducer,
  },
});

// Getting types as per https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
