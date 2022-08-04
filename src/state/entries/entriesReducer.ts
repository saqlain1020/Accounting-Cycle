import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry, EntryName, StateInterface, UpdateData } from "./types";

const initialState: StateInterface = {
  entryNames: [
    { name: "Cash", type: "Asset" },
    { name: "Accounts Receivable", type: "Asset" },
    { name: "Accounts Payable", type: "Liability" },
    { name: "Accumulated Depriciation", type: "Asset" },
  ],
  entries: [
    {
      description: "Cash",
      type: "Asset",
      debit: 0,
      credit: 0,
    },
    {
      description: "Accounts Receivalble",
      type: "Asset",
      debit: 0,
      credit: 0,
    },
    {
      description: "Accounts Payable",
      type: "Liability",
      debit: 0,
      credit: 0,
    },
    {
      description: "Accumulated Depriciation",
      type: "Asset",
      debit: 0,
      credit: 0,
    },
  ],
};

const entriesSlice = createSlice({
  name: "entries",
  initialState: initialState,
  reducers: {
    addEntry: (state: StateInterface, action: PayloadAction<Entry>) => {
      state.entries.push(action.payload);
    },
    removeEntry: (state: StateInterface, action: PayloadAction<number>) => {
      state.entries.splice(action.payload, 1);
    },
    updateEntry: (state: StateInterface, action: PayloadAction<UpdateData>) => {
      state.entries[action.payload.id] = { ...state.entries[action.payload.id], ...action.payload };
    },
    addEntryName: (state: StateInterface, action: PayloadAction<EntryName>) => {
      state.entryNames.push(action.payload);
    },
    removeEntryName: (state: StateInterface, action: PayloadAction<string>) => {
      state.entryNames.splice(
        state.entryNames.findIndex((item: any) => item.name === action.payload),
        1
      );
    },
  },
});

export const { addEntry, removeEntry, updateEntry, addEntryName, removeEntryName } = entriesSlice.actions;

export default entriesSlice.reducer;
