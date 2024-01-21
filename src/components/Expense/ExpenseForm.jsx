import { useState, useMemo, useRef } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { IconButton } from '@mui/material';
import '../../css/index.css';
import ExpenseService from '../../services/purchase.api';

const ExpenseForm = ({ expenseAdded, expenseInvoiceNo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  let sub_total = 0;
  let purchase_total = 0;
  const onSubmit = async (data) => {
    console.log(data, 'dataaaa');
    let expense_items = [];
    expenseItemRows.map((row, index) => {
      expense_items.push({
        description: data[`description_${index}`],
        amount: Number(data[`amount_${index}`])
      });
      // amount = Number(data[`rate_${index}`]) + Number(data[`quantity_${index}`]);
      sub_total += Number(data[`amount_${index}`]);
    });
    purchase_total =
      sub_total + Number(data[`discount`]) + Number(data[`tax_rate`]) + Number(data[`tax`]);
    const formData = {
      invoice_number: expenseInvoiceNo,
      party_name: data.party_name,
      expense_type: data.expense_type,
      expense_date: data.expense_date,
      payment_due_date: data.payment_due_date,
      items: expense_items,
      sub_total: sub_total,
      discount: Number(data.discount),
      tax_rate: Number(data.tax_rate),
      tax: Number(data.tax),
      purchase_total: purchase_total,
      initial_payment: Number(data.initial_payment)
    };
    console.log(formData, 'tpInvoiceNo22');
    await ExpenseService.create({ type: 'EXPENSES', data: formData });
    expenseAdded(formData);
    console.log(data);
  };
  const containerRef = useRef();

  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '500px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );
  const attachStyle = {
    color: '#62728D',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '140px',
    border: 'none'
  };

  // Dynamic expense item row - start

  const staticExpenseItemRow = <></>;

  const inputStyle = {
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`
  };

  const [expenseItemRows, setExpenseItemRows] = useState([{ id: 1 }]);

  const handleExpenseItemRowsButtonClick = (index) => {
    if (index === expenseItemRows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: expenseItemRows.length + 1 };
      setExpenseItemRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setExpenseItemRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  const ddInputStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23000' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right .75rem center',
    backgroundSize: '8px 10px',
    paddingRight: '2rem'
  };

  // Dynamic expense item row - end

  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4">
        <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
          <Container className="ag-theme-alpine mt-4" style={gridStyle}>
            <Row className="mb-3 mt-3" style={{ borderBottom: '1px solid #EBEEF0' }}>
              <Col>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Expense No.
                </p>
                <p style={{ fontSize: '12px' }}>{expenseInvoiceNo}</p>
              </Col>

              <Form.Group as={Col} xs={3} controlId="NewProPurchaseNo">
                <Form.Label
                  className="m-2 d-flex justify-content-end"
                  style={attachStyle}
                  onClick={handleIconClick}>
                  <AttachFileOutlinedIcon fontSize={'small'} />
                  Attachments (0)
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                    }}
                  />
                </Form.Label>
                {errors.attachment && (
                  <Form.Text className="text-danger">{errors.attachment.message}</Form.Text>
                )}
              </Form.Group>
              <Col lg="1">
                <MoreVertOutlinedIcon style={{ color: '#B2B3B7' }} />
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} lg="3">
                <Form.Label>Party Name</Form.Label>
                <Form.Control
                  style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                  type="text"
                  {...register('party_name', {
                    required: 'required',
                    maxLength: {
                      value: 50,
                      message: 'Party Name cannot exceed 50 characters'
                    }
                    // Add more validation rules as needed
                  })}
                />
                {errors.party_name && (
                  <Form.Text className="text-danger">{errors.party_name.message}</Form.Text>
                )}
              </Form.Group>
              {/* <Form.Group as={Col} lg="3" style={{ display: 'grid' }}>
                <Form.Label>Expense Type</Form.Label>
                <FormControl
                  sx={{
                    minWidth: '100%',
                    // marginTop: '0px',
                    color: '#DFE1E6',
                    background: '#FAFBFC',
                    border: '2px solid #FAFBFC'
                  }}
                  size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    style={{ color: '#7A869A' }}
                    {...register(`expense_type`, {
                      required: 'Select an item'
                    })}>
                    Select
                  </InputLabel>
                  <Select labelId="demo-select-small-label" label="Select Work">
                    <MenuItem value={10}>Select</MenuItem>
                    <MenuItem value={20}>Lorem</MenuItem>
                    <MenuItem value={30}>Ipsum</MenuItem>
                  </Select>
                </FormControl>
                {errors[`expense_type`] && (
                  <Form.Text className="text-danger">{errors[`expense_type`].message}</Form.Text>
                )}
              </Form.Group> */}
              <Form.Group as={Col} xs={3}>
                <Form.Label>Expense Type</Form.Label>
                <Form.Select
                  style={{ ...inputStyle, ...ddInputStyle }}
                  {...register(`expense_type`, {
                    required: 'Select an item'
                  })}>
                  <option value="Select">Select</option>
                  <option value="Lorem">Lorem</option>
                  <option value="Ipsum">Ipsum</option>
                </Form.Select>
                {errors[`expense_type`] && (
                  <Form.Text className="text-danger">{errors[`expense_type`].message}</Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} xs={2}>
                <Form.Label>Expense Date</Form.Label>
                <Form.Control
                  type="date"
                  style={inputStyle}
                  {...register('expense_date', {
                    required: 'Expense Due Date is required',
                    pattern: {
                      value: /\d{4}-\d{2}-\d{2}/,
                      message: 'Please enter a valid date (YYYY-MM-DD)'
                    }
                  })}></Form.Control>
                {errors.expense_date && (
                  <Form.Text className="text-danger">{errors.expense_date.message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Label>Payment Due Date</Form.Label>
                <Form.Control
                  type="date"
                  style={inputStyle}
                  {...register('payment_due_date', {
                    required: 'Payment Due Date is required',
                    pattern: {
                      value: /\d{4}-\d{2}-\d{2}/,
                      message: 'Please enter a valid date (YYYY-MM-DD)'
                    }
                  })}></Form.Control>
                {errors.payment_due_date && (
                  <Form.Text className="text-danger">{errors.payment_due_date.message}</Form.Text>
                )}
              </Form.Group>
            </Row>
          </Container>
          <Container className="ag-theme-alpine mt-5" style={gridStyle}>
            {/* <div className='table-responsive'> */}
            <table style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
              <thead style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}>
                <tr>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Expense Description</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Amount</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}></th>
                </tr>
              </thead>

              {expenseItemRows.map((row, index) => (
                <tbody key={index}>
                  <tr>
                    <td style={{ padding: '10px' }}>
                      <Form.Group as={Col}>
                        {/* <Form.Label>Party Name</Form.Label> */}
                        <Form.Control
                          style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                          defaultValue={'Lorem Ipsum'}
                          type="text"
                          {...register(`description_${index}`, {
                            required: 'Select an item'
                          })}
                        />
                        {errors[`description_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`description_${index}`].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {' '}
                      <Form.Group as={Col}>
                        <Form.Control
                          style={{
                            background: '#F4F5F7',
                            color: '#A5ADBA',
                            border: 'none',
                            padding: '9px 12px'
                          }}
                          defaultValue="₹ 3,00,00,000"
                          // disabled
                          type="number"
                          {...register(`amount_${index}`, {
                            required: 'Select an item'
                          })}
                        />
                        {errors[`amount_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`amount_${index}`].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </td>

                    <td style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                      <div
                        style={{
                          height: '40px',
                          width: '40px',
                          background:
                            expenseItemRows.length === 1 || index === expenseItemRows.length - 1
                              ? '#00B7FF'
                              : '#BF2600',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <IconButton onClick={() => handleExpenseItemRowsButtonClick(index)}>
                          {index === expenseItemRows.length - 1 ? (
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
            {/* <div  className='float-end'> */}
            <table
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                marginTop: '20px',
                marginBottom: '20px',
                paddingRight: '50px'
              }}>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                    Sub Total:
                  </td>
                  <td>₹ {sub_total ? sub_total : 0}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                    Discount:
                  </td>
                  <td>
                    <Form.Control
                      style={{
                        background: '#F4F5F7',
                        color: '#A5ADBA',
                        border: 'none',
                        width: '100px',
                        height: '40px'
                      }}
                      defaultValue={7}
                      // disabled
                      type="number"
                      {...register(`discount`, {
                        required: 'Required'
                      })}></Form.Control>
                    {errors[`discount`] && (
                      <Form.Text className="text-danger">{errors[`discount`].message}</Form.Text>
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                    Tax Rate:
                  </td>
                  <td>
                    {' '}
                    <Form.Control
                      style={{
                        background: '#F4F5F7',
                        color: '#A5ADBA',
                        border: 'none',
                        width: '100px',
                        height: '40px'
                      }}
                      placeholder={76}
                      // disabled
                      type="number"
                      {...register(`tax_rate`, {
                        required: 'Required'
                      })}></Form.Control>
                    {errors[`tax_rate`] && (
                      <Form.Text className="text-danger">{errors[`tax_rate`].message}</Form.Text>
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Tax:</td>
                  <td>
                    {' '}
                    <Form.Control
                      style={{
                        background: '#F4F5F7',
                        color: '#A5ADBA',
                        border: 'none',
                        width: '100px',
                        height: '40px',
                        marginBottom: '10px'
                      }}
                      defaultValue={6}
                      // disabled
                      type="number"
                      {...register(`tax`, {
                        required: 'Required'
                      })}></Form.Control>
                    {errors[`tax`] && (
                      <Form.Text className="text-danger">{errors[`tax`].message}</Form.Text>
                    )}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}> </tr>
                <tr>
                  <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                    purchase Total :
                  </td>
                  <td>₹ {purchase_total ? purchase_total : 0}/-</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
                <tr>
                  <td style={{ padding: '10px', paddingBottom: '30px', color: '#5C9EB8' }}>
                    Initial Payment Paid :
                  </td>
                  <td>
                    <Form.Control
                      style={{
                        background: '#F4F5F7',
                        color: '#A5ADBA',
                        border: 'none',
                        width: '150px',
                        height: '40px'
                      }}
                      defaultValue={78}
                      // disabled
                      type="number"
                      {...register(`initial_payment`, {
                        required: 'Required'
                      })}></Form.Control>
                    {errors[`initial_payment`] && (
                      <Form.Text className="text-danger">
                        {errors[`initial_payment`].message}
                      </Form.Text>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* </div> */}
            <Row>
              <div style={{ color: '#62728D', textDecoration: 'Underline', marginTop: '0' }}>
                <LocalPrintshopOutlinedIcon />{' '}
                <span style={{ marginLeft: '5px' }}>Save & Print </span>
                <Button variant="primary" className="m-5" type="submit" style={buttonStyle}>
                  Save
                </Button>
              </div>
            </Row>
            {/* </div> */}
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default ExpenseForm;
