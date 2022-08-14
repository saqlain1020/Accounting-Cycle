import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState: StateInterface = {
  user: null,
};

interface StateInterface {
  user: User | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: StateInterface, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    signOut: (state: StateInterface) => {
      state.user = null;
    },
  },
});

export const { setUser, signOut } = userSlice.actions;

export default userSlice.reducer;
