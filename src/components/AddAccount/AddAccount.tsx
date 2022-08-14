import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { Fab } from "@mui/material";
import useEntry from "src/hooks/useEntry";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { EntryType, ENTRY_TYPES } from "src/state/entries/types";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const AddAccount: React.FC<IProps> = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { entryNames, addEntryName, removeEntryName } = useEntry();
  const location = useLocation();
  const hide = React.useMemo(() => location.pathname === "/auth", [location.pathname]);
  const [entryName, setEntryName] = React.useState("");
  const [type, setType] = React.useState<EntryType>("Asset");

  const handleAdd = () => {
    if (!entryName) return;
    addEntryName(entryName, type);
    setEntryName("");
  };

  if (!hide)
    return (
      <div className={classes.root}>
        <Fab
          style={{ position: "fixed", bottom: 20, right: 20 }}
          color="primary"
          variant="extended"
          onClick={() => setOpen(true)}
        >
          Add Account
        </Fab>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            <b>Add Account</b>
          </DialogTitle>
          <DialogContent>
            <List sx={{ maxHeight: "50vh", overflowY: "auto" }}>
              {entryNames.map((item, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton color="error" onClick={() => removeEntryName(item.name)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={item.type}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              ))}
            </List>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  value={entryName}
                  onChange={(e) => setEntryName(e.target.value)}
                  // variant="standard"
                  label="Enter Account Name"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  select
                  value={type}
                  onChange={(e) => setType(e.target.value as EntryType)}
                  // variant="standard"
                  label="Type"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                >
                  {ENTRY_TYPES.map((item, i) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="contained" color="error" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
    else return null
};

export default AddAccount;
