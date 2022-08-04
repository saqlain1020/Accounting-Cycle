export interface StateInterface {
  entries: Entry[];
  entryNames: EntryName[];
}

export interface EntryName {
  name: string;
  type: EntryType;
}

export interface Entry {
  description: string;
  type: EntryType;
  debit: number;
  credit: number;
  date?: Date;
  id?: string | number;
}

export interface UpdateData {
  description?: string;
  debit?: number;
  credit?: number;
  date?: Date;
  id: number;
}

export type EntryType = "Asset" | "Liability" | "Expense" | "Equity" | "Revenue";

export const ENTRY_TYPES: EntryType[] = ["Asset", "Liability", "Expense", "Equity", "Revenue"];
