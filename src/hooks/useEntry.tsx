import React, { startTransition, useCallback, useTransition } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/state";
import {
  addEntry,
  removeEntry,
  updateEntry,
  addEntryName,
  removeEntryName,
  updateEntryState,
} from "src/state/entries/entriesReducer";
import {
  addAdjustingEntry,
  removeAdjustingEntry,
  updateAdjustingEntry,
  updateAdjustingEntryState,
} from "src/state/adjustingEntries/adjustingEntriesReducer";
import { Entry, EntryType } from "src/state/entries/types";
import useNotify from "./useNotify";
import { AdjustingEntry, UpdateAdjustingData } from "src/state/adjustingEntries/types";

const ENTRY_TYPE: {
  ASSET: EntryType;
  LIABILITY: EntryType;
  EQUITY: EntryType;
  REVENUE: EntryType;
  EXPENSE: EntryType;
} = {
  ASSET: "Asset",
  EQUITY: "Equity",
  LIABILITY: "Liability",
  REVENUE: "Revenue",
  EXPENSE: "Expense",
};

const useEntry = () => {
  const entries = useSelector((state: RootState) => state.entries.entries);
  const adjustingEntries = useSelector((state: RootState) => state.adjustingEntries.entries);
  const entryNames = useSelector((state: RootState) => state.entries.entryNames);
  const dispatch = useAppDispatch();
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

  const deleteEntry = (id: string) => {
    dispatch(removeEntry(id));
  };

  const updateDescription = (id: string, description: string) => {
    const type = entryNames.find((ele) => ele.name === description)?.type;
    if (type) dispatch(updateEntry({ id, description, type }));
    else dispatch(updateEntry({ id, description }));
  };

  const updateDebit = useCallback(
    (id: string, debit: number) => {
      dispatch(updateEntry({ id, debit }));
    },
    [dispatch]
  );

  const updateDebitState = useCallback(
    (id: string, debit: number) => {
      dispatch(updateEntryState({ id, debit }));
    },
    [dispatch]
  );

  const updateCredit = (id: string, credit: number) => {
    dispatch(updateEntry({ id, credit }));
  };

  const updateCreditState = (id: string, credit: number) => {
    dispatch(updateEntryState({ id, credit }));
  };
  const updateDate = (id: string, date: Date) => {
    dispatch(updateEntry({ id, date }));
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
    let itemadjusting = adjustingEntries.find(
      (item) => item.name1.toLowerCase() === str.toLowerCase() || item.name2.toLowerCase() === str.toLowerCase()
    );
    if (item || itemadjusting) {
      notifyError("First delete entry from ledger");
    } else {
      dispatch(removeEntryName(str));
    }
  };

  const _addAdjustingEntry = () => {
    let entry: AdjustingEntry = {
      credit: 0,
      debit: 0,
      description: "Entry Description",
      name1: entryNames[0].name,
      name2: entryNames[1].name,
      date: new Date(),
    };
    dispatch(addAdjustingEntry(entry));
  };

  const _removeAdjustingEntry = (id: string) => {
    dispatch(removeAdjustingEntry(id));
  };

  const updateAdjustingDate = (id: string, date: Date) => {
    dispatch(updateAdjustingEntry({ id, date }));
  };
  const _updateAdjustingEntry = (data: UpdateAdjustingData) => {
    dispatch(updateAdjustingEntry({ ...data }));
    dispatch(updateAdjustingEntryState({ ...data }));
  };

  const _updateAdjustingEntryState = (data: UpdateAdjustingData) => {
    dispatch(updateAdjustingEntryState({ ...data }));
  };

  return {
    entries,
    adjustingEntries,
    add,
    deleteEntry,
    ENTRY_TYPE,
    updateDescription,
    updateCredit,
    updateCreditState,
    updateDate,
    updateDebit,
    updateDebitState,
    totalDebit,
    totalCredit,
    entryNames,
    addEntryName: _addEntryName,
    removeEntryName: _removeEntryName,
    addAdjustingEntry: _addAdjustingEntry,
    removeAdjustingEntry: _removeAdjustingEntry,
    updateAdjustingDate,
    updateAdjustingEntry: _updateAdjustingEntry,
    updateAdjustingEntryState: _updateAdjustingEntryState,
  };
};

export default useEntry;
