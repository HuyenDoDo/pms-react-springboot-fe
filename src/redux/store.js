import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";
import tagReducer from "./TagSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    tags: tagReducer,
  },
});
