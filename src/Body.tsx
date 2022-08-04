import React from "react";
import "./App.css";
import Routes from "./Routes";
import NavDrawer from "src/components/NavDrawer/NavDrawer";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <div>
      <NavDrawer>
        <Routes />
      </NavDrawer>
    </div>
  );
};

export default Body;
