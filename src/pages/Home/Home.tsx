import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {}

const Home: React.FC<Props> = () => {
  const classes = useStyles();

  return <div className={classes.root}>Select any link from the drawer</div>;
};

export default Home;
