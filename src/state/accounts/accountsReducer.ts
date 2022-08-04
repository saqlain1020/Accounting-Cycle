import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StateInterface = {};

interface StateInterface {}

const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialState,
  reducers: {
    setAccounts: (state: StateInterface, action: PayloadAction<StateInterface>) => {
      state = action.payload;
    },
  },
});

export const { setAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
