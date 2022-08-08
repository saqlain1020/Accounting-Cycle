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
import { createAdjustedTrialBalanceEntries, incomeStatementCalculation } from "src/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const StatementOfEquity: React.FC<IProps> = () => {
  const classes = useStyles();
  const { entries, adjustingEntries, entryNames } = useEntry();

  const allEntries = React.useMemo(
    () => createAdjustedTrialBalanceEntries(entries, adjustingEntries, entryNames),
    [entries, adjustingEntries, entryNames]
  );

  const capitalEntries = React.useMemo(() => allEntries.filter((_) => _.type === "Equity"), [allEntries]);
  const drawingEntries = React.useMemo(() => allEntries.filter((_) => _.type === "Drawing"), [allEntries]);

  const { total, type: totalType } = React.useMemo(
    () => incomeStatementCalculation(entries, adjustingEntries, entryNames),
    [entries, adjustingEntries, entryNames]
  );

  const endingCapital = React.useMemo(() => {
    let ans = 0;
    capitalEntries.forEach((entry, i) => {
      if (entry.valueType === "credit") ans += entry.value;
      else ans -= entry.value;
    });
    if (totalType === "credit") ans += total;
    else ans -= total;
    drawingEntries.forEach((entry, i) => {
      if (entry.valueType === "credit") ans += entry.value;
      else ans -= entry.value;
    });
    return ans;
  }, [capitalEntries, total, totalType, drawingEntries]);

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>Statement Of Equity</b>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>
                    <b>Start of period:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {capitalEntries.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Typography>{entry.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{entry.value.toLocaleString()}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>{totalType === "debit" ? "Net Loss" : "Net Gain"}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {totalType === "debit" ? "-" : "+"}
                    {total.toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              {drawingEntries.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Typography>{entry.name}</Typography>
                  </TableCell>
                  <TableCell>
                    {entry.valueType === "debit" ? "-" : "+"}
                    {entry.value.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Capital at end of period</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{endingCapital.toLocaleString()}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default StatementOfEquity;
