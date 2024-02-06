import { useState, useMemo, useRef, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { IconButton } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../../css/index.css';
import ProService from '../../services/purchase.api';

const NewProcurement = ({ procurementAdded, proInvoiceNo }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      formValueChanged(value, name, type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const formValueChanged = (newValue, name, type) => {
    const splitArr = name?.split('_');
    const rowIdx = splitArr[splitArr.length - 1] || null;
    if (
      name.includes('rate_') ||
      (name.includes('quantity_') && !name.includes('amount') && rowIdx !== null)
    ) {
      const amount = +getValues(`rate_${rowIdx}`) + +getValues(`quantity_${rowIdx}`);
      setValue(`amount_${rowIdx}`, amount);
    }
  };

  const [purchaseTotalState, setPurchaseTotalState] = useState(0);
  const [subTotalState, setSubTotalState] = useState(0);
  const calculateFooter = () => {
    let totalAmount = 0;
    purchaseItemRows.forEach((eachRow, idx) => {
      totalAmount += +getValues(`amount_${idx}`);
    });
    setSubTotalState(totalAmount);
    setPurchaseTotalState(totalAmount + Number(getValues(`tax`)) - Number(getValues(`discount`)));
  };

  let sub_total = 0;
  let purchase_total = 0;
  let amount = 0;

  const onSubmit = async (data) => {
    let purchase_items = [];
    purchaseItemRows.map((row, index) => {
      purchase_items.push({
        product_name: data[`product_name_${index}`],
        product_type: data[`product_type_${index}`],
        rate: Number(data[`rate_${index}`]),
        quantity: Number(data[`quantity_${index}`]),
        units: data[`units_${index}`],
        amount: Number(data[`rate_${index}`]) * Number(data[`quantity_${index}`])
      });
      amount = Number(data[`rate_${index}`]) * Number(data[`quantity_${index}`]);
      sub_total += Number(data[`amount_${index}`]);
    }),
      (purchase_total =
        sub_total + Number(data[`discount`]) + Number(data[`tax_rate`]) + Number(data[`tax`]));
    console.log(data);
    const formData = {
      invoice_number: proInvoiceNo,
      supplier_name: data.supplier_name,
      purchase_date: new Date(data.purchase_date),
      payment_due_date: new Date(data.payment_due_date),
      address: data.address,
      phone: data.phone,
      product_details: purchase_items,
      sub_total: sub_total,
      discount: Number(data.discount),
      tax_rate: Number(data.tax_rate),
      tax: Number(data.tax),
      purchase_total: purchase_total,
      initial_payment: Number(data.initial_payment),
      grand_total: purchase_total
    };
    console.log(formData, 'tpInvoiceNo22');
    await ProService.create({ type: 'PROCUREMENT', data: formData });
    procurementAdded(formData);
  };
  const containerRef = useRef();

  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '450px',
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

  // Dynamic purchase item row - start

  const [purchaseItemRows, setPurchaseItemRows] = useState([{ id: 1 }]);

  const handlePurchaseItemRowsButtonClick = (index) => {
    if (index === purchaseItemRows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: purchaseItemRows.length + 1 };
      setPurchaseItemRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setPurchaseItemRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  // Dynamic purchase item row - end

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const inputStyle = {
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`
  };

  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '140px',
    border: 'none'
  };

  const ddInputStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23000' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right .75rem center',
    backgroundSize: '8px 10px',
    paddingRight: '2rem'
  };
  const formGrpStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    paddingBottom: '30px',
    margin: '3px',
    marginBottom: '20px'
  };
  const horizontalLine = {
    borderTopWidth: '0.75px'
  };

  return (
    <>
      {' '}
      <Container ref={containerRef} className="ag-theme-alpine mt-4">
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Container
            className="ag-theme-alpine mt-4"
            style={{ ...gridStyle, paddingBottom: '20px' }}
            // style={formGrpStyle}
          >
            <Row className="mb-3 mt-3" style={{ borderBottom: '1px solid #EBEEF0' }}>
              <Col>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Purchase No.
                </p>
                <p style={{ fontSize: '12px' }}>{proInvoiceNo}</p>
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
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} xs={3} controlId="NewProSupName">
                <Form.Label>Supplier Name</Form.Label>
                {/* <SearchBox placeHolder={'Search Name/Ph no.'} /> */}
                <Form.Control
                  style={inputStyle}
                  type="text"
                  {...register('supplier_name', {
                    required: 'required',
                    maxLength: {
                      value: 50,
                      message: 'Supplier Name cannot exceed 50 characters'
                    }
                    // Add more validation rules as needed
                  })}
                />
              </Form.Group>

              <Form.Group as={Col} xs={3} controlId="NewProPhone">
                <Form.Label>Phone no.</Form.Label>
                <Form.Control
                  style={{ background: '#F4F5F7', color: '#A5ADBA', border: 'none' }}
                  // placeholder="8941555367"
                  defaultValue="8941555367"
                  type="tel"
                  // disabled
                  {...register('phone', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Enter a valid phone number'
                    },
                    maxLength: 10
                  })}
                />
                {errors.phone && (
                  <Form.Text className="text-danger">{errors.phone.message}</Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} xs={2}>
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  style={inputStyle}
                  {...register('purchase_date', {
                    required: 'required',
                    pattern: {
                      value: /\d{4}-\d{2}-\d{2}/,
                      message: 'Please enter a valid date (YYYY-MM-DD)'
                    }
                  })}></Form.Control>
                {errors.purchase_date && (
                  <Form.Text className="text-danger">{errors.purchase_date.message}</Form.Text>
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
            <Row>
              <Form.Group as={Col} xs={3}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  style={inputStyle}
                  {...register('address', {
                    required: 'address is required'
                  })}></Form.Control>
                {errors.address && (
                  <Form.Text className="text-danger">{errors.address.message}</Form.Text>
                )}
              </Form.Group>
              {/* <p className="mb-1" style={{ color: '#62728D' }}>
              Address
            </p>
            <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p> */}
            </Row>
            {/* </Form> */}
          </Container>
          {/* <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}> */}
          {/* <Form className="m-4" onSubmit={handleSubmit(onSubmit)}> */}
          {/* <div className='table-responsive'> */}
          <Container className="ag-theme-alpine mt-4" style={gridStyle}>
            <table style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
              <thead style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}>
                <tr>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Purchase Name</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Product Type</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Rate</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Quantity</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Units</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}>Amount</th>
                  <th style={{ paddingBottom: '10px', padding: '10px' }}></th>
                </tr>
              </thead>

              {purchaseItemRows?.map((row, index) => (
                <tbody
                  key={index}
                  style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C', padding: '20px' }}>
                  <tr>
                    <td style={{ padding: '10px' }}>
                      {/* <FormGroup>
                        <FormControl
                          sx={{
                            minWidth: 150,
                            marginTop: '0px',
                            color: '#DFE1E6',
                            background: '#FAFBFC',
                            border: '2px solid #FAFBFC'
                          }}
                          size="small">
                          <InputLabel id="demo-select-small-label" style={{ color: '#7A869A' }}>
                            Lorem ipsum
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            label="Select"
                            {...register(`product_name_${index}`, { required: 'required' })}>
                            <MenuItem value={10}>Select</MenuItem>
                            <MenuItem value={20}>Lorem</MenuItem>
                            <MenuItem value={30}>Ipsum</MenuItem>
                          </Select>
                        </FormControl>
                        {errors[`product_name_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`product_name_${index}`].message}
                          </Form.Text>
                        )}
                      </FormGroup> */}
                      <Form.Group as={Col} xs={3}>
                        <Form.Select
                          style={{ ...inputStyle, ...ddInputStyle }}
                          {...register(`product_name_${index}`, {
                            required: 'Select an item'
                          })}>
                          <option value="Select">Select</option>
                          <option value="Lorem">Lorem</option>
                          <option value="Ipsum">Ipsum</option>
                        </Form.Select>
                        {errors[`product_name_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`product_name_${index}`].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <Form.Group as={Col}>
                        <Form.Control
                          style={{
                            background: '#F4F5F7',
                            color: '#A5ADBA',
                            border: 'none',
                            padding: '9px 12px'
                          }}
                          placehdefaultValueolder="Machinery"
                          // disabled
                          {...register(`product_type_${index}`, {
                            required: 'Select an item'
                          })}
                        />
                        {errors[`product_type_x`] && (
                          <Form.Text className="text-danger">
                            {errors[`product_type_${index}`].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <Form.Group as={Col}>
                        <Form.Control
                          style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                          defaultValue={10}
                          type="number"
                          {...register(`rate_${index}`, {
                            required: 'Required'
                          })}
                        />
                        {errors[`rate_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`rate_${index}`].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {' '}
                      <Form.Group as={Col}>
                        <Form.Control
                          style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                          defaultValue="30,000"
                          type="number"
                          {...register(`quantity_${index}`, {
                            required: 'Required'
                          })}
                        />
                        {errors[`quantity_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`quantity_${index}`].message}
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
                          defaultValue={78}
                          // disabled
                          type="number"
                          {...register(`units_${index}`, {
                            required: 'Required'
                          })}
                        />
                        {errors[`units_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`units_${index}`].message}
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
                          defaultValue={amount}
                          // disabled
                          type="number"
                          {...register(`amount_${index}`, {
                            required: 'Required'
                          })}
                        />
                        {errors[`amount_${index}`] && (
                          <Form.Text className="text-danger">
                            {errors[`amount_${index}`].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div
                        style={{
                          height: '40px',
                          width: '40px',
                          background:
                            purchaseItemRows.length === 1 || index === purchaseItemRows.length - 1
                              ? '#00B7FF'
                              : '#BF2600',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <IconButton onClick={() => handlePurchaseItemRowsButtonClick(index)}>
                          {index === purchaseItemRows.length - 1 ? (
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
                  <td>{subTotalState || 0}</td>
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
                      defaultValue="4"
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
                      defaultValue="56"
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
                    <Form.Control
                      style={{
                        background: '#F4F5F7',
                        color: '#A5ADBA',
                        border: 'none',
                        width: '100px',
                        height: '40px'
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
                <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
                <tr>
                  <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                    purchase Total :
                  </td>
                  <td>₹ {purchaseTotalState || 0}/-</td>
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
                      defaultValue={0}
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
              <div
                style={{
                  color: '#62728D',
                  textAlign: 'right',
                  textDecoration: 'Underline',
                  marginTop: '0'
                }}>
                <Button
                  className="m-4"
                  style={{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    background: 'grey',
                    borderColor: 'grey'
                  }}
                  variant="primary"
                  onClick={calculateFooter}>
                  Calculate
                </Button>
                <LocalPrintshopOutlinedIcon />{' '}
                <span style={{ marginLeft: '5px' }}>Save & Print </span>
                <Button variant="primary" className="m-5" type="submit" style={buttonStyle}>
                  Save
                </Button>
              </div>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default NewProcurement;
