import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useEntry from "src/hooks/useEntry";
import { v4 as uuid } from "uuid";
import { createAdjustedTrialBalanceEntries } from "src/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const AdjustedTrialBalance: React.FC<IProps> = () => {
  const classes = useStyles();
  const { entries, adjustingEntries, entryNames } = useEntry();

  const results = React.useMemo(
    () => createAdjustedTrialBalanceEntries(entries, adjustingEntries, entryNames),
    [entries, adjustingEntries, entryNames]
  );

  const totalDebit = React.useMemo(
    () => results.filter((_) => _.valueType === "debit").reduce((prev, curr) => prev + curr.value, 0),
    [results]
  );

  const totalCredit = React.useMemo(
    () => results.filter((_) => _.valueType === "credit").reduce((prev, curr) => prev + curr.value, 0),
    [results]
  );

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>Adjusted Trial Balance</b>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="h6">
                    <b>Debit</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    <b>Credit</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell width="50%">
                    <Typography>{entry.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.valueType === "debit" && entry.value.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.valueType === "credit" && entry.value.toLocaleString()}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ borderTop: "2px solid grey" }}>
                <TableCell> </TableCell>
                <TableCell>
                  <Typography variant="h5">{totalDebit.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">{totalCredit.toLocaleString()}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default AdjustedTrialBalance;
