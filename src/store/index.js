import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import admin from "./slices/admin";
import client from "./slices/users";

let store;
const makeStore = () => {
  store = configureStore({
    reducer: {
      admin: todo,
      client: client,
    },
    devTools: true,
  });
  return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);

export { store };
