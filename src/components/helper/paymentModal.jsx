import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import GeneralService from '../../services/generic.api.js';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Col } from 'react-bootstrap';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const PaymentModal = (props) => {
  const { paymentCategory, paymentRefId, onClose } = props;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleSave = (formData) => {
    const paymentPayload = [];
    rows.forEach((row, index) => {
      // Payments
      paymentPayload.push({
        category_type: paymentCategory,
        payment_ref_id: paymentRefId,
        payment_date: formData[`selectedDate_${index}`],
        mode: formData[`mode_${index}`],
        amount_paid: +formData[`amount_${index}`]
      });
    });
    invokePaymentSaveAPI(paymentPayload);
  };

  const invokePaymentSaveAPI = (payload) => {
    GeneralService.addPayment(payload)
      .then((response) => {
        if (response) {
          onClose(true);
        }
      })
      .catch((error) => {
        console.log('Error in adding Payment', error);
        onClose(false);
      });
  };

  const btnStyle = {
    backgroundColor: '#00B7FF',
    color: 'white',
    borderRadius: '5px',
    width: '100%',
    margin: '3px'
  };

  const [rows, setRows] = useState([{ id: 1 }]);

  const handleButtonClick = (index) => {
    if (index === rows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: rows.length + 1 };
      setRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  return (
    <BootstrapDialog
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <Form onSubmit={handleSubmit(handleSave)}>
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
                <th style={{ padding: '0 10px 10px 10px', textAlign: 'center' }}>
                  Mode of Payment
                </th>
                <th style={{ padding: '0 10px 10px 10px', textAlign: 'center' }}>Amount</th>
              </tr>
            </thead>
            {rows.map((row, index) => (
              <tbody key={index}>
                <tr>
                  <td style={{ padding: '10px' }}>{index + 1}</td>
                  <td style={{ padding: '10px' }}>
                    <Controller
                      name={`selectedDate_${index}`}
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            sx={{ width: 180 }}
                            slotProps={{
                              textField: { size: 'small' },
                              field: { clearable: true, onClear: () => setCleared(true) }
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />

                    {errors.date && (
                      <Form.Text className="text-danger">{errors.date.message}</Form.Text>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <Form.Group as={Col}>
                      <Form.Select
                        sx={{
                          minWidth: 150,
                          marginTop: '0px',
                          color: '#DFE1E6',
                          background: '#FAFBFC',
                          border: '4px solid #FAFBFC'
                        }}
                        size="small"
                        {...register(`mode_${index}`, {})}>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <Form.Group as={Col}>
                      <Form.Control
                        {...register(`amount_${index}`, {
                          required: 'Required'
                        })}
                        style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                        type="number"
                      />
                      {errors.amount && (
                        <Form.Text className="text-danger">{errors.amount.message}</Form.Text>
                      )}
                    </Form.Group>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <div
                      style={{
                        height: '40px',
                        width: '40px',
                        background:
                          rows.length === 1 || index === rows.length - 1 ? '#00B7FF' : '#BF2600',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <IconButton onClick={() => handleButtonClick(index)}>
                        {index === rows.length - 1 ? (
                          <AddSharpIcon style={{ color: 'white' }} />
                        ) : (
                          <DeleteOutlineOutlinedIcon style={{ color: 'white' }} />
                        )}
                      </IconButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
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
          <Button style={btnStyle} autoFocus type="submit">
            Add Payment
          </Button>
        </DialogActions>
      </Form>
    </BootstrapDialog>
  );
};

export default PaymentModal;
