import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./people.slice";

export default configureStore({
  reducer: {
    people: peopleReducer,
  },
});
