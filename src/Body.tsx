import React from "react";
import "./App.css";
import Routes from "./Routes";
import NavDrawer from "src/components/NavDrawer/NavDrawer";
import useInit from "./hooks/useInit";

interface Props {}

const Body: React.FC<Props> = () => {
  useInit();

  return (
    <div>
      <NavDrawer>
        <Routes />
      </NavDrawer>
    </div>
  );
};

export default Body;
