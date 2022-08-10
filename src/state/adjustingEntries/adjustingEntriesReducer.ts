import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdjustingEntry, StateInterface, UpdateAdjustingData } from "./types";

const initialState: StateInterface = {
  entries: [
    {
      credit: 70,
      debit: 70,
      description: "Insurance Expense for the month",
      name1: "Insurance Expense",
      name2: "Unexpired Insurance",
      date: "2022-08-10T15:11:40.141Z",
      id: 0,
    },
    {
      credit: 560,
      debit: 560,
      description: "Supplies used for the month",
      name1: "Supplies Expense",
      name2: "Supplies",
      date: "2022-08-10T15:13:59.118Z",
      id: 1,
    },
    {
      credit: 310,
      debit: 310,
      description: "Depreciation expense for the month",
      name1: "Depreciation Expense",
      name2: "Accumulated Depreciation",
      date: "2022-08-10T15:14:22.093Z",
      id: 2,
    },
    {
      credit: 80,
      debit: 80,
      description: "Accrued interest on notes payable",
      name1: "Interest Expense",
      name2: "Interest Payable",
      date: "2022-08-10T15:14:52.581Z",
      id: 3,
    },
    {
      credit: 400,
      debit: 400,
      description: "Service performed for clients who had paid in advance",
      name1: "Unearned Revenue",
      name2: "Revenue from Services",
      date: "2022-08-10T15:15:32.808Z",
      id: 4,
    },
    {
      credit: 1900,
      debit: 1900,
      description: "Salaries due but not yet paid",
      name1: "Salaries Expense",
      name2: "Salaries Payable",
      date: "2022-08-10T15:16:12.055Z",
      id: 5,
    },
  ],
}

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
