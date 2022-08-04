import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  IconButton,
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const GeneralLedger: React.FC<IProps> = () => {
  const classes = useStyles();
  const {
    add,
    ENTRY_TYPE,
    deleteEntry,
    entries,
    updateDescription,
    updateCredit,
    totalCredit,
    totalDebit,
    updateDebit,
  } = useEntry();

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4">
          <b>General Ledger</b>
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
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="h6">
                    <b>Assets:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {entries
                .filter((entry) => entry.type === ENTRY_TYPE.ASSET)
                .map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell width={50}>
                      <IconButton color="error" onClick={() => deleteEntry(entry.id)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell width="50%">
                      <TextField
                        size="small"
                        fullWidth
                        value={entry.description}
                        onChange={(e) => updateDescription(entry.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.debit}
                        onChange={(e) => updateDebit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.credit}
                        onChange={(e) => updateCredit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="center">
                    <IconButton onClick={() => add(ENTRY_TYPE.ASSET)}>
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="h6">
                    <b>Liabilities:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {entries
                .filter((entry) => entry.type === ENTRY_TYPE.LIABILITY)
                .map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell width={50}>
                      <IconButton color="error" onClick={() => deleteEntry(entry.id)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell width="50%">
                      <TextField
                        size="small"
                        fullWidth
                        value={entry.description}
                        onChange={(e) => updateDescription(entry.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.debit}
                        onChange={(e) => updateDebit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.credit}
                        onChange={(e) => updateCredit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="center">
                    <IconButton onClick={() => add(ENTRY_TYPE.LIABILITY)}>
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="h6">
                    <b>Expenses:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {entries
                .filter((entry) => entry.type === ENTRY_TYPE.EXPENSE)
                .map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell width={50}>
                      <IconButton color="error" onClick={() => deleteEntry(entry.id)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell width="50%">
                      <TextField
                        size="small"
                        fullWidth
                        value={entry.description}
                        onChange={(e) => updateDescription(entry.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.debit}
                        onChange={(e) => updateDebit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.credit}
                        onChange={(e) => updateCredit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="center">
                    <IconButton onClick={() => add(ENTRY_TYPE.EXPENSE)}>
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="h6">
                    <b>Equity:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {entries
                .filter((entry) => entry.type === ENTRY_TYPE.EQUITY)
                .map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell width={50}>
                      <IconButton color="error" onClick={() => deleteEntry(entry.id)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell width="50%">
                      <TextField
                        size="small"
                        fullWidth
                        value={entry.description}
                        onChange={(e) => updateDescription(entry.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.debit}
                        onChange={(e) => updateDebit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.credit}
                        onChange={(e) => updateCredit(entry.id, Number(e.target.value))}
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
                <TableCell colSpan={4}>
                  <Typography variant="h6">
                    <b>Revenue:</b>
                  </Typography>
                </TableCell>
              </TableRow>
              {entries
                .filter((entry) => entry.type === ENTRY_TYPE.REVENUE)
                .map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell width={50}>
                      <IconButton color="error" onClick={() => deleteEntry(entry.id)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell width="50%">
                      <TextField
                        size="small"
                        fullWidth
                        value={entry.description}
                        onChange={(e) => updateDescription(entry.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.debit}
                        onChange={(e) => updateDebit(entry.id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        value={entry.credit}
                        onChange={(e) => updateCredit(entry.id, Number(e.target.value))}
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

export default GeneralLedger;
