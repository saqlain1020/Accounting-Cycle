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
  results = results.filter((_) => _.valueType === "debit").concat(results.filter((_) => _.valueType === "credit"));
  return results;
};

export const incomeStatementCalculation = (
  trialBalanceEntries: Entry[],
  adjustingEntries: AdjustingEntry[],
  entryNames: EntryName[]
) => {
  let res = createAdjustedTrialBalanceEntries(trialBalanceEntries, adjustingEntries, entryNames);
  let revenues = res.filter((_) => _.type === "Revenue");
  let expenses = res.filter((_) => _.type === "Expense");
  let total = revenues.concat(expenses).reduce((prev, curr) => {
    if (curr.valueType === "credit") {
      return prev - curr.value;
    } else {
      return curr.value + prev;
    }
  }, 0);
  let obj = {
    revenues,
    expenses,
    total: Math.abs(total),
    type: Math.sign(total) === -1 ? "credit" : "debit",
    allEntries: res,
  };
  return obj;
};

export const calculateEndingCapital = (
  trialBalanceEntries: Entry[],
  adjustingEntries: AdjustingEntry[],
  entryNames: EntryName[]
) => {
  const {
    total,
    type: totalType,
    allEntries,
    expenses,
    revenues,
  } = incomeStatementCalculation(trialBalanceEntries, adjustingEntries, entryNames);
  const capitalEntries = allEntries.filter((_) => _.type === "Equity");
  const drawingEntries = allEntries.filter((_) => _.type === "Drawing");

  let ans = 0;
  capitalEntries.forEach((entry, i) => {
    if (entry.valueType === "credit") ans += entry.value;
    else ans -= entry.value;
  });
  if (totalType === "credit") ans += total;
  else ans -= total;
  drawingEntries.forEach((entry, i) => {
    if (entry.valueType === "credit") ans += entry.value;
    else ans -= entry.value;
  });

  return {
    endingCapital: ans,
    total,
    totalType,
    capitalEntries,
    drawingEntries,
    allEntries,
    expenses,
    revenues,
  };
};

export const createBalanceSheetData = (
  trialBalanceEntries: Entry[],
  adjustingEntries: AdjustingEntry[],
  entryNames: EntryName[]
) => {
  const { allEntries, endingCapital, ...rest } = calculateEndingCapital(
    trialBalanceEntries,
    adjustingEntries,
    entryNames
  );
  let assets = allEntries.filter((_) => _.type === "Asset");
  let liabilities = allEntries.filter((_) => _.type === "Liability");
  let assetsTotal = assets.reduce((prev, curr) => {
    if (curr.valueType === "credit") return prev - curr.value;
    return curr.value + prev;
  }, 0);
  let liabilitiesEquityTotal = liabilities.reduce((prev, curr) => {
    if (curr.valueType === "debit") return prev - curr.value;
    return curr.value + prev;
  }, 0);
  liabilitiesEquityTotal += endingCapital;

  return {
    ...rest,
    assets,
    liabilities,
    endingCapital,
    allEntries,
    assetsTotal,
    liabilitiesEquityTotal,
  };
};
