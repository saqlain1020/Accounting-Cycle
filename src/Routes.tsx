import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import AddAccount from "./components/AddAccount/AddAccount";
import AdjustedTrialBalance from "./pages/AdjustedTrialBalance/AdjustedTrialBalance";
import AdjustingEntries from "./pages/AdjustingEntries/AdjustingEntries";
import Home from "./pages/Home/Home";
import IncomeStatement from "./pages/IncomeStatement/IncomeStatement";
import Test from "./pages/Test/Test";
import TrialBalance from "./pages/TrialBalance/TrialBalance";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <div >
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/trial-balance" element={<TrialBalance />} />
        <Route path="/adjusting-entries" element={<AdjustingEntries />} />
        <Route path="/adjusted-trial-balance" element={<AdjustedTrialBalance />} />
        <Route path="/income-statement" element={<IncomeStatement />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Switch>
      <AddAccount />
      {/* <Footer /> */}
    </div>
  );
};

export default Routes;

export const routesData = [
  {
    name: "Trial Balance",
    path: "/trial-balance",
  },
  {
    name: "Adjusting Entries",
    path: "/adjusting-entries"
  },
  {
    name: "Adjusted Trial Balance",
    path: "/adjusted-trial-balance",
  },
  {
    name: "Income Statement",
    path: "/income-statement",
  },
  {
    name: "Test",
    path: "/test",
  },
  
];
