import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Divider,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useEntry from "src/hooks/useEntry";
import { v4 as uuid } from "uuid";
import moment from "moment";
import DebounceTextField from "src/components/DebounceTextField/DebounceTextField";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& td": {
      borderBottom: "none",
    },
  },
  table: {
    marginTop: 30,
    borderRadius: 12,
    boxShadow: theme.boxShadows[0],
  },
  input: {
    border: "none",
    boxShadow: "none",
  },
}));

interface IProps {}

const AdjustingEntries: React.FC<IProps> = () => {
  const classes = useStyles();
  const {
    adjustingEntries,
    entryNames,
    updateAdjustingEntry,
    updateAdjustingDate,
    addAdjustingEntry,
    removeAdjustingEntry,
    updateAdjustingEntryState
  } = useEntry();

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>Adjusting Entries</b>
        </Typography>
        {adjustingEntries.map((entry, i) => (
          <TableContainer key={i} className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      <b>Date</b>
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      <b>Debit</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      <b>Credit</b>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell rowSpan={2}>
                    <IconButton color="error" onClick={() => removeAdjustingEntry(entry.id!)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell rowSpan={2}>
                    <TextField
                      size="small"
                      fullWidth
                      type="date"
                      className={classes.input}
                      value={moment(entry.date).format("yyyy-MM-DD")}
                      onChange={(e) => updateAdjustingDate(entry.id!, new Date(e.target.value))}
                    />
                  </TableCell>
                  <TableCell width="50%">
                    <TextField
                      select
                      size="small"
                      fullWidth
                      value={entry.name1}
                      className={classes.input}
                      onChange={(e) => updateAdjustingEntry({ id: entry.id!, name1: e.target.value })}
                    >
                      {entryNames.map((item, i) => (
                        <MenuItem key={uuid()} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <DebounceTextField
                      size="small"
                      fullWidth
                      type="number"
                      value={entry.debit.toString()}
                      className={classes.input}
                      callback={(value) => updateAdjustingEntry({ id: entry.id!, debit: Number(value) })}
                      onChange={(e) => updateAdjustingEntryState({ id: entry.id!, debit: Number(e.target.value) })}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" style={{ paddingLeft: "10%" }}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      value={entry.name2}
                      className={classes.input}
                      onChange={(e) => updateAdjustingEntry({ id: entry.id!, name2: e.target.value })}
                    >
                      {entryNames.map((item, i) => (
                        <MenuItem key={uuid()} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <DebounceTextField
                      size="small"
                      fullWidth
                      type="number"
                      value={entry.credit.toString()}
                      className={classes.input}
                      onChange={(e) => updateAdjustingEntryState({ id: entry.id!, credit: Number(e.target.value) })}
                      callback={(value) => updateAdjustingEntry({ id: entry.id!, credit: Number(value) })}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Divider />
                    <DebounceTextField
                      value={entry.description}
                      className={classes.input}
                      multiline
                      fullWidth
                      rows={1}
                      size="small"
                      onChange={(e) => updateAdjustingEntryState({ id: entry.id!, description: e.target.value })}
                      callback={(value) => updateAdjustingEntry({ id: entry.id!, description: value })}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
        <div className="center">
          <IconButton onClick={addAdjustingEntry}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </div>
      </Container>
    </div>
  );
};

export default AdjustingEntries;
