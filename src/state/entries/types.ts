export interface StateInterface {
  entries: Entry[];
  entryNames: EntryName[];
}

export interface EntryName {
  name: string;
  type: EntryType;
  id?: string;
}

export interface Entry {
  description: string;
  type: EntryType;
  debit: number;
  credit: number;
  date?: Date | string;
  id?: string;
}

export interface UpdateData {
  description?: string;
  debit?: number;
  credit?: number;
  date?: Date;
  id: string;
  type?: EntryType;
}

export type EntryType = "Asset" | "Liability" | "Expense" | "Equity" | "Revenue" | "Drawing";

export const ENTRY_TYPES: EntryType[] = ["Asset", "Liability", "Expense", "Equity", "Revenue", "Drawing"];
