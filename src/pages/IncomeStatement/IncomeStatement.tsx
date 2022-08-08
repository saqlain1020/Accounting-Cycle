import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import useEntry from "src/hooks/useEntry";
import { incomeStatementCalculation } from "src/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const IncomeStatement: React.FC<IProps> = () => {
  const classes = useStyles();
  const { entries, adjustingEntries, entryNames } = useEntry();

  const results = React.useMemo(
    () => incomeStatementCalculation(entries, adjustingEntries, entryNames),
    [entries, adjustingEntries, entryNames]
  );

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
                <TableCell>
                  <Typography>
                    <b>{results.type === "debit" ? "Net Loss" : "Net Gain"}</b>
                  </Typography>
                </TableCell>
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
