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
import DebounceTextField from "src/components/DebounceTextField/DebounceTextField";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const TrialBalance: React.FC<IProps> = () => {
  const classes = useStyles();
  const {
    add,
    ENTRY_TYPE,
    deleteEntry,
    entries,
    updateDescription,
    entryNames,
    updateCredit,
    totalCredit,
    totalDebit,
    updateDebitState,
    updateCreditState,
    updateDebit,
  } = useEntry();

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>Trial Balance</b>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
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
              {entries.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell width={50}>
                    <IconButton color="error" onClick={() => deleteEntry(entry.id!)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell width="50%">
                    <TextField
                      select
                      size="small"
                      fullWidth
                      value={entry.description}
                      onChange={(e) => updateDescription(entry.id!, e.target.value)}
                    >
                      <MenuItem value={entry.description} disabled>
                        {entry.description}
                      </MenuItem>
                      {entryNames
                        .filter((item) => !entries.some((e) => e.description === item.name))
                        .map((item, i) => (
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
                      value={entry.debit === 0 ? "" : entry.debit.toString()}
                      onChange={(e) => updateDebitState(entry.id!, Number(e.target.value))}
                      callback={(value) => updateDebit(entry.id!, Number(value))}
                    />
                  </TableCell>
                  <TableCell>
                    <DebounceTextField
                      size="small"
                      fullWidth
                      type="number"
                      value={entry.credit === 0 ? "" : entry.credit.toString()}
                      onChange={(e) => updateCreditState(entry.id!, Number(e.target.value))}
                      callback={(value) => updateCredit(entry.id!, Number(value))}
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={4}>
                  <div className="center">
                    <IconButton onClick={() => add(ENTRY_TYPE.EQUITY)}>
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>
                  <Typography variant="h5">{totalDebit}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">{totalCredit}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default TrialBalance;
