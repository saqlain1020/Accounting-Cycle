import { createSlice } from "@reduxjs/toolkit";

const initialState: StateInterface = {
  loading: false,
  user: {},
};

interface StateInterface {
  loading: boolean;
  user: any;
}

// export const loadUser = createAsyncThunk(
//   "application/loadUser",
//   async (account, thunkApi) => {
//     try {
//       const _user = await getUser(account);
//       console.log(account, _user);
//       return _user;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: StateInterface, action: any) => {
      state.user = action.payload;
    },
    setUserLoading: (state: StateInterface, action: any) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
