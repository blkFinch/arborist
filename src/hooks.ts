import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";

// as recommended in the docs, we'll create typed versions of the hooks
// so we dont have to import the types in every component
// https://redux.js.org/usage/usage-with-typescript
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
