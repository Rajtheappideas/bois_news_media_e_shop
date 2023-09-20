import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUrl } from "../BaseUrl";
import toast from "react-hot-toast";

const initialState = {};

const GetContentSlice = createSlice({
  name: "getContent",
  initialState,
  reducers: {},
});

export const {} = GetContentSlice.actions;

export default GetContentSlice.reducer;
