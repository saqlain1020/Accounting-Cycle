import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

import { Button } from "@mui/material";
import useSettings from "src/hooks/useSettings";
import useNotify from "src/hooks/useNotify";
import DayNightToggle from "react-day-and-night-toggle";
import { signOut, auth } from "src/config/firebase";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "yellow",
  },
}));

interface Props {}

const Test: React.FC<Props> = () => {
  const classes = useStyles();
  const { toggleTheme, themeMode } = useSettings();
  const { notifySuccess, notifyLoading, notifyError, dismissNotify, dismissNotifyAll } = useNotify();
  const [id, setId] = React.useState<any>();

  return (
    <div className={classes.root}>
      <Button onClick={toggleTheme} variant="contained">
        Toggle
      </Button>
      <Button onClick={() => notifySuccess("Good for you!!")} variant="contained" color="success">
        Succes
      </Button>
      <Button onClick={() => notifyError("Good for you!!")} variant="contained" color="error">
        Error
      </Button>
      <Button onClick={() => setId(notifyLoading("Good for you!!"))} variant="contained" color="info">
        Loading
      </Button>
      <Button onClick={() => dismissNotify(id)} variant="contained" color="info">
        Dismiss
      </Button>
      <Button onClick={() => dismissNotifyAll()} variant="contained" color="secondary">
        Dismiss All
      </Button>
      <Button onClick={() => signOut(auth)} variant="contained" color="secondary">
        Sign Out
      </Button>

      <DayNightToggle onChange={toggleTheme} checked={themeMode === "dark"} size={25} />
    </div>
  );
};

export default Test;
