import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

const PaymentModal = ({ visible, onSave, onClose }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    onSave(date, amount);
  };

  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle>Enter payment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="date"
          type="date"
          fullWidth
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
