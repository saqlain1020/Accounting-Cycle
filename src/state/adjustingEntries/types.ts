import { Entry, UpdateData } from "../entries/types";

export interface StateInterface {
  entries: AdjustingEntry[];
}

export interface AdjustingEntry extends Omit<Entry, "type"> {
  name1: string;
  name2: string;
}

export interface UpdateAdjustingData extends Omit<UpdateData, "type"> {
  name1?: string;
  name2?: string;
}
