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

const AfterClosingTByar: React.FC<IProps> = () => {
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
          <b>Empty</b>
        </Typography>
        
      </Container>
    </div>
  );
};

export default AfterClosingTByar;
