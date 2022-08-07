import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdjustingEntry, StateInterface, UpdateAdjustingData } from "./types";

const initialState: StateInterface = {
  entries: [],
};

const adjustingEntriesSlice = createSlice({
  name: "entries",
  initialState: initialState,
  reducers: {
    addAdjustingEntry: (state: StateInterface, action: PayloadAction<AdjustingEntry>) => {
      state.entries.push(action.payload);
    },
    removeAdjustingEntry: (state: StateInterface, action: PayloadAction<number>) => {
      state.entries.splice(action.payload, 1);
    },
    updateAdjustingEntry: (state: StateInterface, action: PayloadAction<UpdateAdjustingData>) => {
      state.entries[action.payload.id] = { ...state.entries[action.payload.id], ...action.payload };
    },
  },
});

export const { addAdjustingEntry, removeAdjustingEntry, updateAdjustingEntry } = adjustingEntriesSlice.actions;

export default adjustingEntriesSlice.reducer;
