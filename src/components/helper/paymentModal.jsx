import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Col } from 'react-bootstrap';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const PaymentModal = ({ visible, onSave, onClose }) => {
  const [cleared, setCleared] = React.useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [itemRowCount, setItemRowCount] = useState(1);
  const [inputPaymentList, setInputPaymentList] = useState([]);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleSave = () => {
    onSave(date, amount);
  };

  const btnStyle = {
    backgroundColor: '#00B7FF',
    color: 'white',
    borderRadius: '5px',
    width: '100%',
    // paddingBottom: '30px',
    margin: '3px'
    // marginBottom: '20px'
  };
  // const horizontalLine = {
  //   borderTopWidth: '0.75px'
  // }

  const itemAddDeleteClicked = (isAdd, rowKey) => {
    if (isAdd) {
      addItemRow();
      return;
    } else {
      // let slicedPaymentRows = JSON.parse(inputPaymentList).splice(rowKey, 1);
      // setInputPaymentList(JSON.stringify(slicedPaymentRows));
      // console.log('delete clicked', inputPaymentItems);
      // setInputPaymentItems(slicedPaymentRows);
      // // setInputPaymentItems(inputPaymentItems.splice(rowKey, 1));
      console.log('row deleted successfully...');
    }
    // deleteItemRow(rowKey);
  };

  const addItemRow = () => {
    setItemRowCount((prevCount) => {
      const newCount = prevCount + 1;

      const currentArraySize = Array.from({ length: newCount });
      const salePaymentRows = currentArraySize.map((ele, idx) => {
        return (
          <>
            <tbody style={{ color: '#6B778C' }}>
              {' '}
              <tr>
                {' '}
                <td style={{ padding: '10px' }}>
                  <FormControl size="small">{idx + 1}</FormControl>
                </td>
                {staticFormGroup}
                {idx + 1 === currentArraySize.length ? (
                  <td
                    style={{ padding: '10px', color: '#00B7FF', cursor: 'pointer' }}
                    onClick={() =>
                      itemAddDeleteClicked(idx + 1 === currentArraySize.length, idx + 1)
                    }>
                    Add row
                  </td>
                ) : (
                  <td
                    style={{ padding: '10px', color: 'black', cursor: 'pointer' }}
                    onClick={() =>
                      itemAddDeleteClicked(idx + 1 === currentArraySize.length, idx + 1)
                    }>
                    <DeleteOutlineOutlinedIcon color="black" />
                  </td>
                )}
              </tr>
            </tbody>
          </>
        );
      });
      console.log('salePaymentRows', salePaymentRows);

      setInputPaymentItems(salePaymentRows);
      // setInputPaymentList(JSON.stringify(salePaymentRows));

      return newCount;
    });
  };

  const staticFormGroup = (
    <>
      <td style={{ padding: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: 180 }}
            slotProps={{
              textField: { size: 'small' },
              field: { clearable: true, onClear: () => setCleared(true) }
            }}
          />
        </LocalizationProvider>
      </td>
      <td style={{ padding: '10px' }}>
        <Form.Group as={Col}>
          <FormControl
            sx={{
              minWidth: 150,
              marginTop: '0px',
              color: '#DFE1E6',
              background: '#FAFBFC',
              border: '4px solid #FAFBFC'
            }}
            size="small">
            <Select>
              <MenuItem value={10}>Cash</MenuItem>
              <MenuItem value={20}>UPI</MenuItem>
              <MenuItem value={30}>Card</MenuItem>
            </Select>
          </FormControl>
        </Form.Group>
      </td>
      <td style={{ padding: '10px' }}>
        <Form.Group as={Col}>
          <Form.Control
            style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
            type="text"
          />
        </Form.Group>
      </td>
    </>
  );

  const [inputPaymentItems, setInputPaymentItems] = useState([
    <>
      <tbody style={{ color: '#6B778C' }}>
        {' '}
        <tr>
          <td style={{ padding: '10px' }}>
            <FormControl size="small">1</FormControl>
          </td>
          {staticFormGroup}
          <td style={{ padding: '10px', color: '#00B7FF', cursor: 'pointer' }} onClick={addItemRow}>
            {' '}
            Add row
          </td>
        </tr>
      </tbody>
    </>
  ]);

  return (
    <BootstrapDialog
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle sx={{ m: 0 }} id="customized-dialog-title">
        + Add Amount
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <table style={{ width: '100%', marginBottom: '20px' }}>
          <thead style={{ color: '#6B778C', fontSize: '14px' }}>
            <tr>
              <th style={{ padding: '0 10px 10px 10px', textAlign: 'center' }}>S.No</th>
              <th style={{ padding: '0 10px 10px 10px', textAlign: 'center' }}>Date</th>
              <th style={{ padding: '0 10px 10px 10px', textAlign: 'center' }}>Mode of Payment</th>
              <th style={{ padding: '0 10px 10px 10px', textAlign: 'center' }}>Amount</th>
            </tr>
          </thead>
          {inputPaymentItems.map((item, idx) => {
            console.log(item, 'itemmmmm');
            return item;
          })}
          {/* {inputPaymentItems} */}
        </table>
      </DialogContent>
      <div className="d-flex" style={{ fontSize: '12px' }}>
        <div style={{ marginTop: '10px', padding: '0 40px 0 10px' }}>
          <span style={{ color: '#5C9EB8' }}>TOTAL PAID:</span>
          <span> ₹ 10,000.00</span>
        </div>
        <div style={{ marginTop: '10px', padding: '0 40px 0 10px' }}>
          <span style={{ color: '#5C9EB8' }}>OUTSTANDING :</span>
          <span style={{ color: '#DE350B' }}> ₹ 8,600.00</span>
        </div>
      </div>
      <DialogActions>
        <Button style={btnStyle} autoFocus onClick={handleSave}>
          Add Payment
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default PaymentModal;
