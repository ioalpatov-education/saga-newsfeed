import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);
