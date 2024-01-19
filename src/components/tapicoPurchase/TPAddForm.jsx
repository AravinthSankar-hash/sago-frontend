import { useMemo, useRef, useState, useEffect } from 'react';
import { Container, Form, Row, Col, Dropdown, Button, FormGroup, FormLabel } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import TpService from '../../services/purchase.api';
import { useForm } from 'react-hook-form';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/material';

function TPAddForm({ showForm, tpAdded, tpInvoiceNo }) {
  // let invoiceNumber;
  // useEffect(() => {
  //   TpService.getInvoiceNo('TP')
  //     .then((response) => {
  //       invoiceNumber = response.data.invoiceNumber;
  //     })
  //     .catch((error) => {
  //       console.log('Error in getting customer data', error);
  //     });
  // }, []);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(321);
    console.log(data, 'data');
    console.log(123);
    const newTP = {
      invoice_number: tpInvoiceNo,
      tapico_type: data.tapiocaType,
      purchase_date: data.purchaseDate,
      broker_name: data.brokerName,
      commission: data.commission,
      payment_due_date: data.paymentDueDate,
      vehicle_no: data.vehicleNo,
      weight_bill_no: data.weightBillNo
      // aadhar: data.aadhar,
      // pan: data.pan,
      // description: data.description,
      // designation: data.designation
    };
    // console.log(newTP, 'tpInvoiceNo22');

    // await TpService.create({ type: 'TP', data: newTP });
    // tpAdded(newTP);
  };

  const containerRef = useRef();
  const gridStyle = useMemo(
    () => ({
      width: '100%',
      overflowY: 'auto',
      maxHeight: '750px',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );
  const formGrpStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    paddingBottom: '30px',
    margin: '3px',
    marginBottom: '20px'
  };
  const inputStyle = {
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`
  };
  const summaztionFooterRows = {
    padding: '10px',
    color: '#62728D'
  };
  const summaztionFooterCol = {
    textAlign: 'right',
    paddingLeft: '60px',
    border: '0.5px solid #D9D9D9',
    borderRadius: '15px',
    padding: '15px'
  };
  const horizontalLine = {
    borderTopWidth: '0.75px'
  };

  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '140px',
    border: 'none'
  };

  // const addItemRow = () => {
  //   setItemRowCount((prevCount) => {
  //     const newCount = prevCount + 1;

  //     const currentArraySize = Array.from({ length: newCount });
  //     const saleItemsRows = currentArraySize.map((ele, idx) => {
  //       return (
  //         <Row className="m-3 mb-0" key={idx + 1}>
  //           {staticFormGroup}
  //           <Form.Group as={Col} xs={1}>
  //             <div
  //               onClick={() => itemAddDeleteClicked(idx + 1 === currentArraySize.length, idx + 1)}
  //               style={{
  //                 height: '40px',
  //                 width: '42px',
  //                 background: idx + 1 === currentArraySize.length ? '#00B7FF' : '#BF2600',
  //                 color: 'white',
  //                 display: 'flex',
  //                 borderRadius: '8px',
  //                 justifyContent: 'center',
  //                 alignItems: 'center'
  //               }}>
  //               {idx + 1 === currentArraySize.length ? (
  //                 <AddSharpIcon />
  //               ) : (
  //                 <DeleteOutlineOutlinedIcon />
  //               )}
  //             </div>
  //           </Form.Group>
  //         </Row>
  //       );
  //     });

  //     setInputsaleItems(saleItemsRows);

  //     return newCount;
  //   });
  // };
  // const staticFormGroup = (
  //   <>
  //     <Form.Group as={Col} xs={2}>
  //       <Dropdown>
  //         <Dropdown.Toggle
  //           style={{
  //             ...inputStyle,
  //             backgroundColor: '#DFE1E6',
  //             borderColor: '#DFE1E6',
  //             color: '#7A869A',
  //             width: '100%',
  //             textAlign: 'left'
  //           }}
  //           id="dropdown-basic">
  //           Choose Something
  //         </Dropdown.Toggle>

  //         <Dropdown.Menu>
  //           <Dropdown.Item>Thippi</Dropdown.Item>
  //           <Dropdown.Item>Action 2 Action 1 Action 1</Dropdown.Item>
  //           <Dropdown.Item>Action 3</Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </Form.Group>
  //     <Form.Group as={Col} xs={1}>
  //       <Form.Control style={inputStyle}></Form.Control>
  //     </Form.Group>
  //     <Form.Group as={Col} xs={1}>
  //       <Form.Control style={inputStyle}></Form.Control>
  //     </Form.Group>
  //     <Form.Group as={Col} xs={1}>
  //       <Form.Control style={inputStyle}></Form.Control>
  //     </Form.Group>
  //     <Form.Group as={Col} xs={1}>
  //       <Form.Control style={inputStyle}></Form.Control>
  //     </Form.Group>
  //     <Form.Group as={Col} xs={2}>
  //       <Form.Control style={inputStyle}></Form.Control>
  //     </Form.Group>
  //     <Form.Group as={Col} xs={2}>
  //       <Form.Control style={inputStyle}></Form.Control>
  //     </Form.Group>
  //   </>
  // );
  // const [inputSaleItems, setInputsaleItems] = useState(
  //   <Row className="m-3 mb-0">
  //     {staticFormGroup}
  //     <Form.Group as={Col} xs={1}>
  //       <div
  //         onClick={addItemRow}
  //         style={{
  //           height: '40px',
  //           width: '42px',
  //           background: '#00B7FF',
  //           color: 'white',
  //           display: 'flex',
  //           borderRadius: '8px',
  //           justifyContent: 'center',
  //           alignItems: 'center'
  //         }}>
  //         <AddSharpIcon />
  //       </div>
  //     </Form.Group>
  //   </Row>
  // );

  // DYNAMIC WEIGHTAGE ROWS - START

  const staticWeightageFormGroup = (
    <>
      <FormControl
        as={Col}
        xs={2}
        sx={{ m: 1, minWidth: 160, marginTop: '0px', backgroundColor: 'white' }}
        size="small">
        <Select style={{ width: 160 }}>
          <MenuItem value="Wet Thippi">Wet Thippi</MenuItem>
          <MenuItem value="Dry Thippi">Dry Thippi</MenuItem>
        </Select>
      </FormControl>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={2}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
    </>
  );

  const [weightageRows, setWeightageRows] = useState([{ id: 1 }]);

  const handleWeightageButtonClick = (index) => {
    if (index === weightageRows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: weightageRows.length + 1 };
      setWeightageRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setWeightageRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  // DYNAMIC WEIGHTAGE ROWS - END

  // CHARGES DYNAMIC FORM - START

  const staticChargesFormGroup = (
    <>
      <Form.Group as={Col} xs={2}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={2}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={2}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
    </>
  );

  const [chargesRows, setChargesRows] = useState([{ id: 1 }]);

  const handleChargesButtonClick = (index) => {
    if (index === chargesRows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: chargesRows.length + 1 };
      setChargesRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setChargesRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  // CHARGES DYNAMIC FORM - END

  // FARMER DYNAMIC FORM - START
  const staticFarmerFormGroup = (
    <>
      <Form.Group as={Col} xs={3}>
        <Form.Control
          style={inputStyle}
          // eslint-disable-next-line no-undef
          // {...register(`farmer_name${index}`, { required: 'This field is required' })}
          // {...register('farmerDetails')}
          // {
          //   required: 'Farmer farmerDetails is required'
          //   // Add more validation rules as needed
          // })}
        ></Form.Control>
        {/* {errors.farmerDetails && (
          <Form.Text className="text-danger">{errors.farmerDetails.message}</Form.Text>
        )} */}
      </Form.Group>
      <Form.Group as={Col} xs={3}>
        <Form.Control
          style={inputStyle}
          {...register('farmerAadharNo')}
          // {
          //   required: 'Farmer Aadhar No. is required',
          //   pattern: {
          //     value: /^[0-9]{12}$/, // Exactly 12 digits
          //     message: 'Please enter a valid 12-digit Aadhar number'
          //   }
          //   // Add more validation rules as needed
          // })}
        ></Form.Control>
        {/* {errors.farmerAadharNo && (
          <Form.Text className="text-danger">{errors.farmerAadharNo.message}</Form.Text>
        )} */}
      </Form.Group>
    </>
  );

  const [farmerRows, setFarmerRows] = useState([{ id: 1 }]);

  const handleFarmerButtonClick = (index) => {
    if (index === farmerRows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: farmerRows.length + 1 };
      setFarmerRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setFarmerRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  // FARMER DYNAMIC FORM - END

  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Basic Details</Form.Label>
          <hr style={{ horizontalLine }} />

          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Purchase No.</Form.Label>
              <Form.Control style={inputStyle} disabled value={tpInvoiceNo} />
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Tapico Type</Form.Label>
              <FormControl isInvalid={errors.tapiocaType}>
                <Select
                  style={{ width: 260 }}
                  size="small"
                  {...register('tapiocaType', { required: 'Please select Tapioca Type' })}>
                  <MenuItem value="Wet Thippi">Wet Thippi</MenuItem>
                  <MenuItem value="Dry Thippi">Dry Thippi</MenuItem>
                </Select>
                {errors.tapiocaType && (
                  <Form.Text className="text-danger">{errors.tapiocaType.message}</Form.Text>
                )}
              </FormControl>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                {...register('purchaseDate', {
                  required: 'Purchase Date is required',
                  pattern: {
                    value: /\d{4}-\d{2}-\d{2}/,
                    message: 'Please enter a valid date (YYYY-MM-DD)'
                  }
                })}
              />
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.purchaseDate && (
                <Form.Text className="text-danger">{errors.purchaseDate.message}</Form.Text>
              )}
              {/* </Form.Control.Feedback> */}
            </Form.Group>
          </Row>
          <hr style={{ ...horizontalLine, marginLeft: '28px' }} />

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Broker Name</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('brokerName', {
                  required: 'Broker Name is required',
                  maxLength: {
                    value: 50,
                    message: 'Broker Name cannot exceed 50 characters'
                  }
                  // Add more validation rules as needed
                })}></Form.Control>
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.brokerName && (
                <Form.Text className="text-danger">{errors.brokerName.message}</Form.Text>
              )}
              {/* </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Commission(%)</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('commission', {
                  required: 'Commission is required',
                  pattern: {
                    value: /^(\d*\.)?\d+$/, // Allows decimals
                    message: 'Please enter a valid commission percentage'
                  },
                  max: {
                    value: 100,
                    message: 'Commission cannot exceed 100%'
                  }
                  // Add more validation rules as needed
                })}></Form.Control>{' '}
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.commission && (
                <Form.Text className="text-danger">{errors.commission.message}</Form.Text>
              )}
              {/* </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Payment Due Date</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                {...register('paymentDueDate', {
                  required: 'Payment Due Date is required',
                  pattern: {
                    value: /\d{4}-\d{2}-\d{2}/,
                    message: 'Please enter a valid date (YYYY-MM-DD)'
                  }
                })}></Form.Control>
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.paymentDueDate && (
                <Form.Text className="text-danger">{errors.paymentDueDate.message}</Form.Text>
              )}
              {/* </Form.Control.Feedback> */}
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Phone No.</Form.Label>
              <p>1234567890</p>
            </Form.Group>
          </Row>
          <hr style={{ ...horizontalLine, marginLeft: '28px' }} />

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Vehicle No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('vehicleNo', {
                  required: 'Vehicle No. is required',
                  pattern: {
                    value: /^[A-Za-z0-9]+$/, // Alphanumeric characters only
                    message: 'Please enter a valid vehicle number'
                  },
                  maxLength: {
                    value: 10,
                    message: 'Vehicle No. cannot exceed 10 characters'
                  }
                  // Add more validation rules as needed
                })}></Form.Control>
              {errors.vehicleNo && (
                <Form.Text className="text-danger">{errors.vehicleNo.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Weight Bill No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('weightBillNo', {
                  required: 'Weight Bill No. is required',
                  pattern: {
                    value: /^[A-Za-z0-9]+$/, // Alphanumeric characters only
                    message: 'Please enter a valid weight bill number'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Weight Bill No. cannot exceed 20 characters'
                  }
                  // Add more validation rules as needed
                })}></Form.Control>
              {errors.weightBillNo && (
                <Form.Text className="text-danger">{errors.weightBillNo.message}</Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="m-3 mb-0">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Farmer Details</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Farmer Aadhar No.</Form.Label>
            </Form.Group>
          </Row>

          {farmerRows.map((row, index) => (
            <Row className="m-3  mt-0" key={index}>
              {staticFarmerFormGroup}
              <Form.Group as={Col} xs={1}>
                <div
                  style={{
                    height: '40px',
                    width: '42px',
                    background:
                      farmerRows.length === 1 || index === farmerRows.length - 1
                        ? '#00B7FF'
                        : '#BF2600',
                    color: 'white',
                    display: 'flex',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <IconButton onClick={() => handleFarmerButtonClick(index)}>
                    {index === farmerRows.length - 1 ? (
                      <AddSharpIcon style={{ color: 'white' }} />
                    ) : (
                      <DeleteOutlineOutlinedIcon style={{ color: 'white' }} />
                    )}
                  </IconButton>
                </div>
              </Form.Group>
            </Row>
          ))}
        </div>

        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Weightage details</Form.Label>
          <hr style={{ horizontalLine }} />
          <Row className="m-3 mb-0">
            <Form.Group as={Col} xs={2}>
              <Form.Label>Product Type</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Total Bags</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Total weight</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1} style={{ width: 120 }}>
              <Form.Label>Vehicle weight</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Net weight</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Sand weight (%)</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Sand weight</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Tonnage</Form.Label>
            </Form.Group>
          </Row>
          {weightageRows.map((row, index) => (
            <Row className="m-3 mb-0" key={index}>
              {staticWeightageFormGroup}
              <Form.Group as={Col} xs={1}>
                <div
                  style={{
                    height: '40px',
                    width: '42px',
                    background:
                      weightageRows.length === 1 || index === weightageRows.length - 1
                        ? '#00B7FF'
                        : '#BF2600',
                    color: 'white',
                    display: 'flex',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <IconButton onClick={() => handleWeightageButtonClick(index)}>
                    {index === weightageRows.length - 1 ? (
                      <AddSharpIcon style={{ color: 'white' }} />
                    ) : (
                      <DeleteOutlineOutlinedIcon style={{ color: 'white' }} />
                    )}
                  </IconButton>
                </div>
              </Form.Group>
            </Row>
          ))}
        </div>

        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Charges details</Form.Label>
          <hr style={{ horizontalLine }} />

          <Row className="m-3 mb-0">
            <Form.Group as={Col} xs={2}>
              <Form.Label>Point 1</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Point 2</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Point 3</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Point 4</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>AP</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>TP</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>P.Rate</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Total Rate</Form.Label>
            </Form.Group>
          </Row>
          {chargesRows.map((row, index) => (
            <Row className="m-3 mb-4" key={index}>
              {staticChargesFormGroup}
              <Form.Group as={Col} xs={1}>
                <div
                  style={{
                    height: '40px',
                    width: '42px',
                    background:
                      chargesRows.length === 1 || index === chargesRows.length - 1
                        ? '#00B7FF'
                        : '#BF2600',
                    color: 'white',
                    display: 'flex',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <IconButton onClick={() => handleChargesButtonClick(index)}>
                    {index === chargesRows.length - 1 ? (
                      <AddSharpIcon style={{ color: 'white' }} />
                    ) : (
                      <DeleteOutlineOutlinedIcon style={{ color: 'white' }} />
                    )}
                  </IconButton>
                </div>
              </Form.Group>
            </Row>
          ))}
          <Row>
            <Col xs={5}>
              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Tonnage Rate (₹)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Labour Charges (₹)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Vehicle Rent (₹)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Other Charges (₹)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Weight + Kickback (₹)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Round Off (₹)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
              </Row>
            </Col>
            <Col
              xs={5}
              style={{
                summaztionFooterCol
              }}>
              <Row>
                <Col style={{ borderRight: '0.5px solid #62728D' }}>
                  <table>
                    <tbody style={{ textAlign: 'left' }}>
                      <tr>
                        <td style={summaztionFooterRows}>Total Rate</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 1,000</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Vehicle Rent</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8,944</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Weight + Kickback</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8,944</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Commission</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8,944</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Other Charges</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8,944</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Round-Off</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8,944</td>
                      </tr>
                      <tr style={{ borderTop: '0.5px solid #62728D' }}>
                        <td style={summaztionFooterRows}>Total Amount</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8,944</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col className="d-flex align-items-center">
                  <div>
                    <p style={{ paddingLeft: '30px' }}>Grand Amount(₹)</p>
                    <p style={{ textAlign: 'center', fontWeight: 'bolder' }}>₹ 10,944</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <div style={{ color: '#62728D', textDecoration: 'Underline', marginTop: '0' }}>
                  <LocalPrintshopOutlinedIcon />{' '}
                  <span style={{ marginLeft: '5px' }}>Save & Print </span>
                  <Button variant="primary" className="m-5" type="submit" style={buttonStyle}>
                    Save
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
}

export default TPAddForm;
