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
import { createBalanceSheetData } from "src/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const BalanceSheet: React.FC<IProps> = () => {
  const classes = useStyles();
  const { entries, adjustingEntries, entryNames } = useEntry();

  const { endingCapital, assets, liabilities, assetsTotal, liabilitiesEquityTotal } = React.useMemo(
    () => createBalanceSheetData(entries, adjustingEntries, entryNames),
    [entries, adjustingEntries, entryNames]
  );
  const totalRows = React.useMemo(() => Math.max(assets.length, liabilities.length + 1), [assets, liabilities]);

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>Balance Sheet</b>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>
                    <b>Assets:</b>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    <b>$</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    <b>Liabilities & Owner's Equity:</b>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    <b>$</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {new Array(totalRows).fill(1).map((_, i) => (
                <TableRow>
                  <TableCell>{assets[i]?.name}</TableCell>
                  <TableCell align="right">
                    {assets[i] && `${assets[i].valueType === "credit" ? "-" : ""}${assets[i].value}`}
                  </TableCell>
                  <TableCell>
                    {liabilities[i]?.name}
                    {i === totalRows - 2 && `Ending Capital`}
                  </TableCell>
                  <TableCell align="right">
                    {liabilities[i] && `${liabilities[i].valueType === "debit" ? "-" : ""}${liabilities[i].value}`}
                    {i === totalRows - 2 && `${endingCapital}`}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">
                  <b>{assetsTotal}</b>
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <b>{liabilitiesEquityTotal}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default BalanceSheet;
