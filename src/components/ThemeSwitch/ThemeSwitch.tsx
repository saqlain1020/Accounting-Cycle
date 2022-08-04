import React from "react";
import { makeStyles } from "@mui/styles";
import { Switch, Theme } from "@mui/material";
import useSettings from "src/hooks/useSettings";
import Star from "src/assets/images/icons/star.png";
import Moon from "src/assets/images/icons/moon.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    top: "10vh",
    right: 0,
    padding: "5px 10px",
    background: "rgba(0,0,0,0.05)",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    boxShadow: "-2px 2px 30px rgba(100, 100, 100, 0.6)",
    backdropFilter: "blur(10px)",
  },
  switch: {
    height: 25,
    width: 46,
    padding: 0,
    position: "relative",
    "& .MuiSwitch-switchBase": {
      padding: 2.5,
    },
    "&.Mui-checked .MuiSwitch-switchBase": {
      transform: "translateX(30px)",
    },
    "& .MuiSwitch-track": {
      borderRadius: 360,
      display: "block",
      backgroundColor: theme.palette.primary.dark,
      opacity: 1,
    },
    "& .MuiSwitch-track:before": {
      content: "''",
      width: 5,
      height: 5,
      borderRadius: 360,
      background: "white",
      position: "absolute",
      right: 8,
      top: 5,
    },
    "& .MuiSwitch-track:after": {
      content: "''",
      width: 3,
      height: 3,
      borderRadius: 360,
      background: "white",
      position: "absolute",
      right: 15,
      top: 12,
    },
  },

  switchChecked: {
    height: 25,
    width: 45,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 2.5,
    },

    "& .MuiSwitch-track": {
      borderRadius: 360,
      background: `linear-gradient(90deg, #273049 2.88%, #0F121E 52.88%)`,
      position: "relative",
      opacity: "1 !important",
    },
    "& .MuiSwitch-track:after": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      content: "''",
      background: `url(${Star}), url(${Star}), url(${Star}), url(${Star})`,
      backgroundSize: "5px, 3px, 3px, 4px",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "8px, 18px, 11px, 18px",
      backgroundPositionY: "5px, 5px, 17px, 12px",
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "transparent",
      background: `url(${Moon})`,
      backgroundSize: "100% 100%",
      position: "relative",
      border: 0,
      overflow: "hidden",
    },
  },
}));

interface IProps {}
const ThemeSwitch: React.FC<IProps> = () => {
  const classes = useStyles();
  const { toggleTheme, themeMode } = useSettings();

  const checked = React.useMemo(() => themeMode === "light", [themeMode]);

  return (
    <div className={classes.root}>
      <Switch
        onChange={() => toggleTheme()}
        checked={checked}
        className={checked ? classes.switchChecked : classes.switch}
      />
    </div>
  );
};

export default ThemeSwitch;
