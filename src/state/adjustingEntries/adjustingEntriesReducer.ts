import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdjustingEntry, StateInterface, UpdateAdjustingData } from "./types";
import {
  setDoc,
  addDoc,
  db,
  collection,
  CollectionName,
  deleteDoc,
  doc,
  where,
  query,
  getDocs,
} from "src/config/firebase";

const initialState: StateInterface = {
  entries: [
    // {
    //   credit: 70,
    //   debit: 70,
    //   description: "Insurance Expense for the month",
    //   name1: "Insurance Expense",
    //   name2: "Unexpired Insurance",
    //   date: "2022-08-10T15:11:40.141Z",
    //   id: 0,
    // },
    // {
    //   credit: 560,
    //   debit: 560,
    //   description: "Supplies used for the month",
    //   name1: "Supplies Expense",
    //   name2: "Supplies",
    //   date: "2022-08-10T15:13:59.118Z",
    //   id: 1,
    // },
    // {
    //   credit: 310,
    //   debit: 310,
    //   description: "Depreciation expense for the month",
    //   name1: "Depreciation Expense",
    //   name2: "Accumulated Depreciation",
    //   date: "2022-08-10T15:14:22.093Z",
    //   id: 2,
    // },
    // {
    //   credit: 80,
    //   debit: 80,
    //   description: "Accrued interest on notes payable",
    //   name1: "Interest Expense",
    //   name2: "Interest Payable",
    //   date: "2022-08-10T15:14:52.581Z",
    //   id: 3,
    // },
    // {
    //   credit: 400,
    //   debit: 400,
    //   description: "Service performed for clients who had paid in advance",
    //   name1: "Unearned Revenue",
    //   name2: "Revenue from Services",
    //   date: "2022-08-10T15:15:32.808Z",
    //   id: 4,
    // },
    // {
    //   credit: 1900,
    //   debit: 1900,
    //   description: "Salaries due but not yet paid",
    //   name1: "Salaries Expense",
    //   name2: "Salaries Payable",
    //   date: "2022-08-10T15:16:12.055Z",
    //   id: 5,
    // },
  ],
};

export const addAdjustingEntry = createAsyncThunk(
  "adjustingEntries/addAdjustingEntry",
  async (entry: AdjustingEntry, thunkAPI) => {
    let uid = (thunkAPI.getState() as any).user.user.uid;
    if (!uid) return;
    addDoc(collection(db, CollectionName.AdjustingEntries), {
      ...entry,
      user: uid,
    }).then((res) => {
      thunkAPI.dispatch(addAdjustingEntryState({ ...entry, id: res.id }));
    });
  }
);

export const removeAdjustingEntry = createAsyncThunk(
  "adjustingEntries/removeAdjustingEntry",
  async (id: string, thunkAPI) => {
    let uid = (thunkAPI.getState() as any).user.user.uid;
    if (!uid) return;
    deleteDoc(doc(db, CollectionName.AdjustingEntries, id)).then(() => {
      thunkAPI.dispatch(removeAdjustingEntryState(id));
    });
  }
);

export const updateAdjustingEntry = createAsyncThunk(
  "adjustingEntries/updateAdjustingEntry",
  async (data: UpdateAdjustingData, thunkAPI) => {
    let uid = (thunkAPI.getState() as any).user.user.uid;
    console.log(data);
    if (!uid) return;
    setDoc(doc(db, CollectionName.AdjustingEntries, data.id), data, { merge: true }).then(() => {
      thunkAPI.dispatch(updateAdjustingEntryState(data));
    });
  }
);

export const fetchAdjustingEntries = createAsyncThunk("adjustingEntries/fetchAdjustingEntries", async (_, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  let q = query(collection(db, CollectionName.AdjustingEntries), where("user", "==", uid));
  let querySnapshot = await getDocs(q);
  thunkAPI.dispatch(clearAdjustingEntries());
  querySnapshot.forEach((doc) => {
    let data = {
      ...(doc.data() as AdjustingEntry),
      id: doc.id,
    };
    thunkAPI.dispatch(addAdjustingEntryState(data));
  });
});

const adjustingEntriesSlice = createSlice({
  name: "adjustingEntries",
  initialState: initialState,
  reducers: {
    addAdjustingEntryState: (state: StateInterface, action: PayloadAction<AdjustingEntry>) => {
      state.entries.push(action.payload);
    },
    removeAdjustingEntryState: (state: StateInterface, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
    },
    updateAdjustingEntryState: (state: StateInterface, action: PayloadAction<UpdateAdjustingData>) => {
      state.entries = state.entries.map((entry) => {
        if (entry.id === action.payload.id) {
          return {
            ...entry,
            ...action.payload,
          };
        }
        return entry;
      });
    },
    clearAdjustingEntries: (state: StateInterface) => {
      state.entries = [];
    },
  },
});

export const { addAdjustingEntryState, clearAdjustingEntries, removeAdjustingEntryState, updateAdjustingEntryState } =
  adjustingEntriesSlice.actions;

export default adjustingEntriesSlice.reducer;
