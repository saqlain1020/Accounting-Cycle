import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry, EntryName, StateInterface, UpdateData } from "./types";

const initialState: StateInterface = {
  entryNames: [
    { name: "Cash", type: "Asset" },
    { name: "Accounts Receivable", type: "Asset" },
    { name: "Unexpired Insurance", type: "Asset" },
    { name: "Supplies", type: "Asset" },
    { name: "Equipment", type: "Asset" },
    { name: "Accumulated Depreciation", type: "Asset" },
    { name: "Notes Payable", type: "Liability" },
    { name: "Unearned Revenue", type: "Liability" },
    { name: "Capital", type: "Equity" },
    { name: "Drawings", type: "Drawing" },
    { name: "Revenue from Services", type: "Revenue" },
    { name: "Rent Expense", type: "Expense" },
    { name: "Salaries Expense", type: "Expense" },
    { name: "Insurance Expense", type: "Expense" },
    { name: "Supplies Expense", type: "Expense" },
    { name: "Depreciation Expense", type: "Expense" },
    { name: "Interest Expense", type: "Expense" },
    { name: "Interest Payable", type: "Liability" },
    { name: "Salaries Payable", type: "Liability" },
  ],
  entries: [
    { description: "Cash", type: "Asset", debit: 3700, credit: 0, id: 0 },
    { credit: 0, debit: 2900, description: "Accounts Receivable", type: "Asset", id: 1 },
    { credit: 0, debit: 490, description: "Unexpired Insurance", type: "Asset", id: 2 },
    { credit: 0, debit: 1460, description: "Supplies", type: "Asset", id: 3 },
    { credit: 0, debit: 18600, description: "Equipment", type: "Asset", id: 4 },
    { credit: 2480, debit: 0, description: "Accumulated Depreciation", type: "Asset", id: 5 },
    { credit: 10000, debit: 0, description: "Notes Payable", type: "Liability", id: 6 },
    { credit: 1200, debit: 0, description: "Unearned Revenue", type: "Liability", id: 7 },
    { credit: 14190, debit: 0, description: "Capital", type: "Equity", id: 8 },
    { credit: 0, debit: 1500, description: "Drawings", type: "Drawing", id: 9 },
    { credit: 5130, debit: 0, description: "Revenue from Services", type: "Revenue", id: 10 },
    { credit: 0, debit: 2450, description: "Rent Expense", type: "Expense", id: 11 },
    { credit: 0, debit: 1900, description: "Salaries Expense", type: "Expense", id: 12 },
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
