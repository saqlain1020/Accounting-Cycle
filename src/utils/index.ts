import { AdjustingEntry } from "src/state/adjustingEntries/types";
import { Entry, EntryName, EntryType } from "src/state/entries/types";

interface Adjustings {
  [key: string]: {
    debit?: number;
    credit?: number;
  };
}

interface Result {
  value: number;
  valueType: "debit" | "credit";
  name: string;
  type: EntryType;
}

export const createAdjustedTrialBalanceEntries = (
  trialBalanceEntries: Entry[],
  adjustingEntries: AdjustingEntry[],
  entryNames: EntryName[]
) => {
  let adjustings: Adjustings = {};
  let results: Result[] = [];

  adjustingEntries.forEach((ele) => {
    let n1 = ele.name1;
    let n2 = ele.name2;
    let debitN1 = Number(ele.debit);
    let creditN2 = Number(ele.credit);
    adjustings[n1] = {
      debit: adjustings[n1]?.debit ? adjustings[n1]?.debit! + debitN1 : debitN1,
    };
    adjustings[n2] = {
      credit: adjustings[n1]?.credit ? adjustings[n1]?.credit! + creditN2 : creditN2,
    };
  });

  trialBalanceEntries.forEach((ele) => {
    let name = ele.description;
    let debit = Number(ele.debit);
    let credit = Number(ele.credit);
    adjustings[name] = {
      debit: adjustings[name]?.debit ? adjustings[name]?.debit! + debit : debit,
      credit: adjustings[name]?.credit ? adjustings[name]?.credit! + credit : credit,
    };
  });

  Object.entries(adjustings).forEach(([name, { credit, debit }]) => {
    let value = (credit || 0) - (debit || 0);
    if (value === 0) return;

    let obj = {
      name,
      credit,
      debit,
      value: Math.abs(value),
      valueType: Math.sign(value) === 1 ? "credit" : "debit",
      type: entryNames.find((item) => item.name === name)?.type,
    };
    // @ts-ignore
    results.push(obj);
  });
  results = results.filter((_)=>_.valueType==="debit").concat(results.filter((_)=>_.valueType==="credit"))
  return results;
};

export {};
