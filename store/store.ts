import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { AaraasApi } from "@/services/services";
export const store = configureStore({
  reducer: {
    [AaraasApi.reducerPath]: AaraasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AaraasApi.middleware),
});
setupListeners(store.dispatch);
