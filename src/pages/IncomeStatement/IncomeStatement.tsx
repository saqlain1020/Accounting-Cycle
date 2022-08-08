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

const IncomeStatement: React.FC<IProps> = () => {
  const classes = useStyles();
  const { entries, adjustingEntries, entryNames } = useEntry();

  const results = React.useMemo(() => {
    let res = createAdjustedTrialBalanceEntries(entries, adjustingEntries, entryNames);
    let revenueNames = entryNames.filter((_) => _.type === "Revenue");
    let expenseNames = entryNames.filter((_) => _.type === "Expense");
    let revenues = res.filter((_) => revenueNames.some((i) => i.name === _.name));
    let expenses = res.filter((_) => expenseNames.some((i) => i.name === _.name));
    let total = revenues.concat(expenses).reduce((prev, curr) => {
      if (curr.valueType === "credit") {
        return prev - curr.value;
      } else {
        return curr.value + prev;
      }
    }, 0);
    let obj = {
      revenues,
      expenses,
      total: Math.abs(total),
      type: Math.sign(total) === -1 ? "credit" : "debit",
    };
    return obj;
  }, [entries, adjustingEntries, entryNames]);

  //   const totalCredit = React.useMemo(
  //     () => results.filter((_) => _.valueType === "credit").reduce((prev, curr) => prev + curr.value, 0),
  //     [results]
  //   );

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>Income Statement</b>
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
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography>
                    <b>Revenue:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {results.revenues.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell width="50%">
                    <Typography>{entry.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.valueType === "debit" && entry.value}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.valueType === "credit" && entry.value}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography>
                    <b>Expense:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {results.expenses.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell width="50%">
                    <Typography>{entry.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.valueType === "debit" && entry.value}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.valueType === "credit" && entry.value}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ borderTop: "2px solid grey" }}>
                <TableCell><Typography><b>{results.type === "debit" ? "Net Loss" : "Net Gain"}</b></Typography></TableCell>
                <TableCell>
                  <Typography variant="h6">{results.type === "credit" && results.total}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{results.type === "debit" && results.total}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default IncomeStatement;
