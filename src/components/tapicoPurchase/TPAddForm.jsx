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
import { RESPONSE_MSG } from './tp.const.js';
import Toaster from '../helper/Snackbar.jsx';

function TPAddForm({ showForm, tpAdded, tpInvoiceNo }) {
  const [farmerRows, setFarmerRows] = useState([{ id: 1 }]);
  const [totalRateSumState, setTotalRateSumState] = useState(0);
  const [grandTotalState, setGrandTotalState] = useState(0);
  const [commissionValueState, setCommisstionValueState] = useState(0);

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
      name.includes('point_1_') ||
      name.includes('point_2_') ||
      name.includes('point_3_') ||
      (name.includes('point_4_') && !name.includes('ap_') && rowIdx !== null)
    ) {
      const avgPoint =
        (+getValues(`point_1_${rowIdx}`) +
          +getValues(`point_2_${rowIdx}`) +
          +getValues(`point_3_${rowIdx}`) +
          +getValues(`point_4_${rowIdx}`)) /
        4;
      setValue(`ap_${rowIdx}`, avgPoint);
      setValue(`tp_${rowIdx}`, avgPoint);
    } else if (name.includes('p_rate_') && !name.includes('total_rate_')) {
      setValue(`total_rate_${rowIdx}`, +getValues(`tp_${rowIdx}`) * +getValues(`p_rate_${rowIdx}`));
    } else if (
      name.includes('total_weight_') ||
      (name.includes('vehicle_weight_') && !name.includes('net_weight_'))
    ) {
      const netWeight =
        +getValues(`total_weight_${rowIdx}`) - +getValues(`vehicle_weight_${rowIdx}`);
      setValue(`net_weight_${rowIdx}`, netWeight);
      const sandWeig = (netWeight * 5) / 100;
      setValue(`sand_weight_percentage_${rowIdx}`, 5);
      setValue(`sand_weight_${rowIdx}`, sandWeig);
      setValue(`tonnage_${rowIdx}`, netWeight - sandWeig);
    }
  };

  const calculateFooter = () => {
    let totalRate = 0;
    farmerRows.forEach((eachRow, idx) => {
      totalRate += +getValues(`total_rate_${idx}`);
    });
    setTotalRateSumState(totalRate);
    const vr = +getValues(`vehicle_rent`);
    const wk = +getValues(`weight_kickback`);
    const oc = +getValues(`other_charges`);
    const roff = +getValues(`round_off`);
    const commission = (totalRate * +getValues(`commission`)) / 100;
    setCommisstionValueState(commission);
    setGrandTotalState(vr + wk + oc + roff + commission)?.toFixed(2);
  };

  let total_rate_sum = 0;
  let grand_total = 0;
  let vehicle_rent = 0;
  let weight_kickback = 0;
  let other_charges = 0;
  let round_off = 0;
  let commission = 0;

  const onSubmit = async (data) => {
    let charges_details = [];

    chargesRows.map((row, index) => {
      charges_details.push({
        point_1: Number(data[`point_1_${index}`]),
        point_2: Number(data[`point_2_${index}`]),
        point_3: Number(data[`point_3_${index}`]),
        point_4: Number(data[`point_4_${index}`]),
        ap: Number(data[`ap_${index}`]),
        tp: Number(data[`tp_${index}`]),
        p_rate: Number(data[`p_rate_${index}`]),
        total_rate: Number(data[`total_rate_${index}`])
      });
      total_rate_sum += +data[`total_rate_${index}`];
    });
    grand_total =
      total_rate_sum +
      Number(data.vehicle_rent) +
      Number(data.weight_kickback) +
      Number(data.other_charges) +
      Number(data.round_off) +
      Number(data.commission);

    vehicle_rent = Number(data.vehicle_rent);
    weight_kickback = Number(data.weight_kickback);
    other_charges = Number(data.other_charges);
    round_off = Number(data.round_off);
    commission = Number(data.commission);
    // Get the address from the form field
    console.log(7868, 'address');
    console.log(data, 'data');
    console.log(123);
    const formData = {
      invoice_number: tpInvoiceNo,
      address: data.address,
      phone: data.phone,
      tapico_type: data.tapico_type,
      purchase_date: new Date(data.purchase_date),
      broker_name: data.broker_name,
      commission: data.commission,
      payment_due_date: new Date(data.payment_due_date),
      vehicle_no: data.vehicle_no,
      weight_bill_no: data.weight_bill_no,
      farmer_details: farmerRows.map((row, index) => ({
        name: data[`name_${index}`],
        aadhar: data[`aadhar_${index}`]
      })),
      weightage_details: weightageRows.map((row, index) => ({
        product_name: data[`product_name_${index}`],
        total_bags: Number(data[`total_bags_${index}`]),
        total_weight: Number(data[`total_weight_${index}`]),
        vehicle_weight: Number(data[`vehicle_weight_${index}`]),
        net_weight: Number(data[`net_weight_${index}`]),
        sand_weight_percentage: Number(data[`sand_weight_percentage_${index}`]),
        sand_weight: Number(data[`sand_weight_${index}`]),
        tonnage: Number(data[`tonnage_${index}`])
      })),
      charges_details: charges_details,
      tonnage_rate: Number(data.tonnage_rate),
      vehicle_rent: Number(data.vehicle_rent),
      weight_kickback: Number(data.weight_kickback),
      labour_charges: Number(data.labour_charges),
      other_charges: Number(data.other_charges),
      round_off: Number(data.round_off),
      grand_total: grand_total,
      payment_status: 'PENDING'
    };
    console.log(formData, 'tpInvoiceNo22');
    await TpService.create({ type: 'TP', data: formData });
    tpAdded(formData);
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
  const ddInputStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23000' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right .75rem center',
    backgroundSize: '8px 10px',
    paddingRight: '2rem'
  };

  // CHARGES DYNAMIC FORM - END

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
              <FormControl isInvalid={errors.tapico_type}>
                <Select
                  style={{ width: 260 }}
                  size="small"
                  {...register('tapico_type', { required: 'Please select Tapioca Type' })}>
                  <MenuItem value="Wet Thippi">Wet Thippi</MenuItem>
                  <MenuItem value="Dry Thippi">Dry Thippi</MenuItem>
                </Select>
                {errors.tapico_type && (
                  <Form.Text className="text-danger">{errors.tapico_type.message}</Form.Text>
                )}
              </FormControl>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                {...register('purchase_date', {
                  required: 'Purchase Date is required',
                  pattern: {
                    value: /\d{4}-\d{2}-\d{2}/,
                    message: 'Please enter a valid date (YYYY-MM-DD)'
                  }
                })}
              />
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.purchase_date && (
                <Form.Text className="text-danger">{errors.purchase_date.message}</Form.Text>
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
                {...register('broker_name', {
                  required: 'Broker Name is required',
                  maxLength: {
                    value: 50,
                    message: 'Broker Name cannot exceed 50 characters'
                  }
                  // Add more validation rules as needed
                })}></Form.Control>
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.broker_name && (
                <Form.Text className="text-danger">{errors.broker_name.message}</Form.Text>
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
                {...register('payment_due_date', {
                  required: 'Payment Due Date is required',
                  pattern: {
                    value: /\d{4}-\d{2}-\d{2}/,
                    message: 'Please enter a valid date (YYYY-MM-DD)'
                  }
                })}></Form.Control>
              {/* <Form.Control.Feedback type="invalid"> */}
              {errors.payment_due_date && (
                <Form.Text className="text-danger">{errors.payment_due_date.message}</Form.Text>
              )}
              {/* </Form.Control.Feedback> */}
            </Form.Group>
          </Row>

          <Row className="m-3">
            {/* <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
            </Form.Group> */}
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
            {/* <Form.Group as={Col} xs={3}>
              <Form.Label>Phone No.</Form.Label>
              <p>1234567890</p>
            </Form.Group> */}
            <Form.Group as={Col} xs={3}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('phone', {
                  required: 'phone is required'
                })}></Form.Control>
              {errors.phone && (
                <Form.Text className="text-danger">{errors.phone.message}</Form.Text>
              )}
            </Form.Group>
          </Row>
          <hr style={{ ...horizontalLine, marginLeft: '28px' }} />

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Vehicle No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('vehicle_no', {
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
              {errors.vehicle_no && (
                <Form.Text className="text-danger">{errors.vehicle_no.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Weight Bill No.</Form.Label>
              <Form.Control
                style={inputStyle}
                type="text"
                {...register('weight_bill_no', {
                  required: 'Weight Bill No. is required'
                  // pattern: {
                  //   value: /^[A-Za-z0-9]+$/, // Alphanumeric characters only
                  //   message: 'Please enter a valid weight bill number'
                  // },
                  // maxLength: {
                  //   value: 20,
                  //   message: 'Weight Bill No. cannot exceed 20 characters'
                  // }
                  // Add more validation rules as needed
                })}></Form.Control>
              {errors.weight_bill_no && (
                <Form.Text className="text-danger">{errors.weight_bill_no.message}</Form.Text>
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
              <Form.Group as={Col} xs={3}>
                <Form.Control
                  style={inputStyle}
                  {...register(`name_${index}`, {
                    required: 'This field is required'
                  })}></Form.Control>
                {errors[`name_${index}`] && (
                  <Form.Text className="text-danger">{errors[`name_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={3}>
                <Form.Control
                  style={inputStyle}
                  {...register(`aadhar_${index}`, {
                    required: 'Farmer Aadhar No. is required',
                    pattern: {
                      value: /^[0-9]{12}$/, // Exactly 12 digits
                      message: 'Please enter a valid 12-digit Aadhar number'
                    }
                    // Add more validation rules as needed
                  })}></Form.Control>
                {errors[`aadhar_${index}`] && (
                  <Form.Text className="text-danger">{errors[`aadhar_${index}`].message}</Form.Text>
                )}
              </Form.Group>
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
              <Form.Label>Product Name</Form.Label>
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
              <Form.Group as={Col} xs={2}>
                <Form.Select
                  style={{ ...inputStyle, ...ddInputStyle }}
                  {...register(`product_name_${index}`, {
                    required: 'Select an item'
                  })}>
                  <option value="Wet Thippi">Wet Thippi</option>
                  <option value="Dry Thippi">Dry Thippi</option>
                </Form.Select>
                {errors[`product_name_x`] && (
                  <Form.Text className="text-danger">
                    {errors[`product_name_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`total_bags_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`total_bags_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`total_bags_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`total_weight_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`total_weight_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`total_weight_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`vehicle_weight_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`vehicle_weight_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`vehicle_weight_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`net_weight_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`net_weight_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`net_weight_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`sand_weight_percentage_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`sand_weight_percentage_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`sand_weight_percentage_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`sand_weight_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`sand_weight_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`sand_weight_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`tonnage_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`tonnage_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`tonnage_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
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
              <Form.Group as={Col} xs={2}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`point_1_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`point_1_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`point_1_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`point_2_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`point_2_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`point_2_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`point_3_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`point_3_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`point_3_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`point_4_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`point_4_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`point_4_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`ap_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`ap_${index}`] && (
                  <Form.Text className="text-danger">{errors[`ap_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`tp_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`tp_${index}`] && (
                  <Form.Text className="text-danger">{errors[`tp_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`p_rate_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`p_rate_${index}`] && (
                  <Form.Text className="text-danger">{errors[`p_rate_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Control
                  style={inputStyle}
                  type="number"
                  {...register(`total_rate_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`total_rate_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`total_rate_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
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
                  <Form.Control
                    style={inputStyle}
                    type="number"
                    {...register(`tonnage_rate`, {
                      required: 'Required'
                    })}></Form.Control>
                  {errors[`tonnage_rate`] && (
                    <Form.Text className="text-danger">{errors[`tonnage_rate`].message}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Labour Charges (₹)</Form.Label>
                  <Form.Control
                    style={inputStyle}
                    type="number"
                    {...register(`vehicle_rent`, {
                      required: 'Required'
                    })}></Form.Control>
                  {errors[`vehicle_rent`] && (
                    <Form.Text className="text-danger">{errors[`vehicle_rent`].message}</Form.Text>
                  )}
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Vehicle Rent (₹)</Form.Label>
                  <Form.Control
                    style={inputStyle}
                    type="number"
                    {...register(`weight_kickback`, {
                      required: 'Required'
                    })}></Form.Control>
                  {errors[`weight_kickback`] && (
                    <Form.Text className="text-danger">
                      {errors[`weight_kickback`].message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Other Charges (₹)</Form.Label>
                  <Form.Control
                    style={inputStyle}
                    type="number"
                    {...register(`labour_charges`, {
                      required: 'Required'
                    })}></Form.Control>
                  {errors[`labour_charges`] && (
                    <Form.Text className="text-danger">
                      {errors[`labour_charges`].message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Weight + Kickback (₹)</Form.Label>
                  <Form.Control
                    style={inputStyle}
                    type="number"
                    {...register(`other_charges`, {
                      required: 'Required'
                    })}></Form.Control>
                  {errors[`other_charges`] && (
                    <Form.Text className="text-danger">{errors[`other_charges`].message}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Round Off (₹)</Form.Label>
                  <Form.Control
                    style={inputStyle}
                    type="number"
                    {...register(`round_off`, {
                      required: 'Required'
                    })}></Form.Control>
                  {errors[`round_off`] && (
                    <Form.Text className="text-danger">{errors[`round_off`].message}</Form.Text>
                  )}
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
                        <td>{totalRateSumState || 0}</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Vehicle Rent</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>{+getValues(`vehicle_rent`) || 0}</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Weight + Kickback</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>{+getValues(`weight_kickback`) || 0}</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Commission</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>{commissionValueState || 0}</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Other Charges</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>{+getValues(`other_charges`) || 0}</td>
                      </tr>
                      <tr>
                        <td style={summaztionFooterRows}>Round-Off</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>{+getValues(`round_off`) || 0}</td>
                      </tr>
                      <tr style={{ borderTop: '0.5px solid #62728D' }}>
                        <td style={summaztionFooterRows}>Total Amount</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>{grandTotalState || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col className="d-flex align-items-center">
                  <div>
                    <p style={{ paddingLeft: '30px' }}>Grand Amount(₹)</p>
                    <p style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                      {grandTotalState || 0}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <div
                  style={{
                    color: '#62728D',
                    textAlign: 'right',
                    textDecoration: 'Underline',
                    marginTop: '0'
                  }}>
                  <LocalPrintshopOutlinedIcon />{' '}
                  <span style={{ marginLeft: '5px' }}>Save & Print </span>
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
