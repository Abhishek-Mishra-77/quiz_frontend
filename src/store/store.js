import { configureStore } from "@reduxjs/toolkit";
import questionSlicereducer from "./test";

const store=configureStore({reducer:questionSlicereducer})
export default store