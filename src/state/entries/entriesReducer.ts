import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Entry, EntryName, StateInterface, UpdateData } from "./types";
import {
  db,
  doc,
  CollectionName,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "src/config/firebase";
import { RootState } from "..";

const initialState: StateInterface = {
  entryNames: [
    // { name: "Cash", type: "Asset" },
    // { name: "Accounts Receivable", type: "Asset" },
    // { name: "Unexpired Insurance", type: "Asset" },
    // { name: "Supplies", type: "Asset" },
    // { name: "Equipment", type: "Asset" },
    // { name: "Accumulated Depreciation", type: "Asset" },
    // { name: "Notes Payable", type: "Liability" },
    // { name: "Unearned Revenue", type: "Liability" },
    // { name: "Capital", type: "Equity" },
    // { name: "Drawings", type: "Drawing" },
    // { name: "Revenue from Services", type: "Revenue" },
    // { name: "Rent Expense", type: "Expense" },
    // { name: "Salaries Expense", type: "Expense" },
    // { name: "Insurance Expense", type: "Expense" },
    // { name: "Supplies Expense", type: "Expense" },
    // { name: "Depreciation Expense", type: "Expense" },
    // { name: "Interest Expense", type: "Expense" },
    // { name: "Interest Payable", type: "Liability" },
    // { name: "Salaries Payable", type: "Liability" },
  ],
  entries: [
    // { description: "Cash", type: "Asset", debit: 3700, credit: 0, id: 0 },
    // { credit: 0, debit: 2900, description: "Accounts Receivable", type: "Asset", id: 1 },
    // { credit: 0, debit: 490, description: "Unexpired Insurance", type: "Asset", id: 2 },
    // { credit: 0, debit: 1460, description: "Supplies", type: "Asset", id: 3 },
    // { credit: 0, debit: 18600, description: "Equipment", type: "Asset", id: 4 },
    // { credit: 2480, debit: 0, description: "Accumulated Depreciation", type: "Asset", id: 5 },
    // { credit: 10000, debit: 0, description: "Notes Payable", type: "Liability", id: 6 },
    // { credit: 1200, debit: 0, description: "Unearned Revenue", type: "Liability", id: 7 },
    // { credit: 14190, debit: 0, description: "Capital", type: "Equity", id: 8 },
    // { credit: 0, debit: 1500, description: "Drawings", type: "Drawing", id: 9 },
    // { credit: 5130, debit: 0, description: "Revenue from Services", type: "Revenue", id: 10 },
    // { credit: 0, debit: 2450, description: "Rent Expense", type: "Expense", id: 11 },
    // { credit: 0, debit: 1900, description: "Salaries Expense", type: "Expense", id: 12 },
  ],
};

export const fetchEntries = createAsyncThunk("entries/fetchEntries", async (_, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  let q = query(collection(db, CollectionName.Entries), where("user", "==", uid));
  let querySnapshot = await getDocs(q);
  thunkAPI.dispatch(clearEntries());
  querySnapshot.forEach((doc) => {
    let data = {
      ...(doc.data() as Entry),
      id: doc.id,
    };
    thunkAPI.dispatch(addEntryState(data));
  });
});

export const addEntry = createAsyncThunk("entries/addEntry", async (entry: Entry, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  addDoc(collection(db, CollectionName.Entries), {
    ...entry,
    user: uid,
  }).then((res) => {
    thunkAPI.dispatch(addEntryState({ ...entry, id: res.id }));
  });
});

export const removeEntry = createAsyncThunk("entries/removeEntry", async (id: string, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  deleteDoc(doc(db, CollectionName.Entries, id)).then(() => {
    thunkAPI.dispatch(removeEntryState(id));
  });
});

export const updateEntry = createAsyncThunk("entries/updateEntry", async (data: UpdateData, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  console.log(data)
  if (!uid) return;
  setDoc(doc(db, CollectionName.Entries, data.id), data, { merge: true }).then(() => {
    thunkAPI.dispatch(updateEntryState(data));
  });
});

export const addEntryName = createAsyncThunk("entries/addEntryName", async (entryName: EntryName, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  addDoc(collection(db, CollectionName.EntryNames), {
    ...entryName,
    user: uid,
  }).then((res) => {
    thunkAPI.dispatch(addEntryNameState({ ...entryName, id: res.id }));
  });
});

export const removeEntryName = createAsyncThunk("entries/removeEntryName", async (name: string, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  let state = thunkAPI.getState() as RootState;
  let id = state.entries.entryNames.find((item) => item.name === name)?.id!;
  deleteDoc(doc(db, CollectionName.EntryNames, id)).then(() => {
    thunkAPI.dispatch(removeEntryNameState(name));
  });
});

export const fetchEntryName = createAsyncThunk("entries/fetchEntryName", async (_, thunkAPI) => {
  let uid = (thunkAPI.getState() as any).user.user.uid;
  if (!uid) return;
  let q = query(collection(db, CollectionName.EntryNames), where("user", "==", uid));
  let querySnapshot = await getDocs(q);
  thunkAPI.dispatch(clearEntryNames());
  querySnapshot.forEach((doc) => {
    let data = {
      ...(doc.data() as EntryName),
      id: doc.id,
    };
    thunkAPI.dispatch(addEntryNameState(data));
  });
});

const entriesSlice = createSlice({
  name: "entries",
  initialState: initialState,
  reducers: {
    addEntryState: (state: StateInterface, action: PayloadAction<Entry>) => {
      state.entries.push(action.payload);
    },
    removeEntryState: (state: StateInterface, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((item) => item.id !== action.payload);
    },
    updateEntryState: (state: StateInterface, action: PayloadAction<UpdateData>) => {
      state.entries = state.entries.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    },
    clearEntries: (state: StateInterface) => {
      state.entries = [];
    },
    clearEntryNames: (state: StateInterface) => {
      state.entryNames = [];
    },
    addEntryNameState: (state: StateInterface, action: PayloadAction<EntryName>) => {
      state.entryNames.push(action.payload);
    },
    removeEntryNameState: (state: StateInterface, action: PayloadAction<string>) => {
      state.entryNames.splice(
        state.entryNames.findIndex((item: any) => item.name === action.payload),
        1
      );
    },
  },
});

export const {
  addEntryState,
  removeEntryState,
  updateEntryState,
  addEntryNameState,
  removeEntryNameState,
  clearEntryNames,
  clearEntries,
} = entriesSlice.actions;

export default entriesSlice.reducer;
