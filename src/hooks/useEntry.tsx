import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/state";
import { addEntry, removeEntry, updateEntry, addEntryName, removeEntryName } from "src/state/entries/entriesReducer";
import { Entry, EntryType } from "src/state/entries/types";
import useNotify from "./useNotify";

const ENTRY_TYPE: {
  ASSET: EntryType;
  LIABILITY: EntryType;
  EQUITY: EntryType;
  REVENUE: EntryType;
  EXPENSE: EntryType;
} = {
  ASSET: "Asset",
  LIABILITY: "Liability",
  EQUITY: "Equity",
  REVENUE: "Revenue",
  EXPENSE: "Expense",
};

const useEntry = () => {
  const entries = useSelector((state: RootState) => state.entries.entries);
  const entryNames = useSelector((state: RootState) => state.entries.entryNames);
  const dispatch = useAppDispatch();
  const modifiedEntries = React.useMemo(() => entries.map((item, i) => ({ ...item, id: i })), [entries]);
  const { notifyError } = useNotify();
  const totalDebit = React.useMemo(() => {
    let total = 0;
    entries.forEach((entry) => {
      total += entry.debit;
    });
    return total;
  }, [entries]);
  const totalCredit = React.useMemo(() => {
    let total = 0;
    entries.forEach((entry) => {
      total += entry.credit;
    });
    return total;
  }, [entries]);

  const add = (type: EntryType) => {
    let entry: Entry = {
      credit: 0,
      debit: 0,
      description: "",
      type: type,
    };
    dispatch(addEntry(entry));
  };

  const deleteEntry = (index: number) => {
    dispatch(removeEntry(index));
  };

  const updateDescription = (index: number, description: string) => {
    dispatch(updateEntry({ id: index, description }));
  };
  const updateDebit = (index: number, debit: number) => {
    dispatch(updateEntry({ id: index, debit }));
  };
  const updateCredit = (index: number, credit: number) => {
    dispatch(updateEntry({ id: index, credit }));
  };
  const updateDate = (index: number, date: Date) => {
    dispatch(updateEntry({ id: index, date }));
  };

  const _addEntryName = (str: string, type: EntryType) => {
    let item = entryNames.find((item) => item.name.toLowerCase() === str.toLowerCase());
    if (item) {
      notifyError("Entry name already exists");
    } else {
      dispatch(addEntryName({ name: str, type }));
    }
  };

  const _removeEntryName = (str: string) => {
    let item = entries.find((item) => item.description.toLowerCase() === str.toLowerCase());
    if (item) {
      notifyError("First delete entry from ledger");
    } else {
      dispatch(removeEntryName(str));
    }
  };

  return {
    entries: modifiedEntries,
    add,
    deleteEntry,
    ENTRY_TYPE,
    updateDescription,
    updateCredit,
    updateDate,
    updateDebit,
    totalDebit,
    totalCredit,
    entryNames,
    addEntryName: _addEntryName,
    removeEntryName: _removeEntryName,
  };
};

export default useEntry;
