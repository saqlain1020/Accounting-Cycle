import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import AddAccount from "./components/AddAccount/AddAccount";
import AdjustedTrialBalance from "./pages/AdjustedTrialBalance/AdjustedTrialBalance";
import AdjustingEntries from "./pages/AdjustingEntries/AdjustingEntries";
import GeneralLedger from "./pages/GeneralLedger/GeneralLedger";
import Home from "./pages/Home/Home";
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
        <Route path="/general-ledger" element={<GeneralLedger />} />
        <Route path="/adjusting-entries" element={<AdjustingEntries />} />
        <Route path="/adjusted-trial-balance" element={<AdjustedTrialBalance />} />
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
    name: "General Ledger",
    path: "/general-ledger",
  },
];
