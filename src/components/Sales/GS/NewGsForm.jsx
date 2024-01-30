import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useRef, useMemo } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useForm } from 'react-hook-form';
import { IconButton } from '@mui/material';
import '../../../css/index.css';
import Toaster from '../../helper/Snackbar.jsx';
// API Service
import SaleService from '../../../services/sale.api.js';
import { SERVICES } from '../../../services/api.const.js';
import { RESPONSE_MSG } from '../sale.const.js';

function NewGsForm({ gsAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
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
  const summaztionFooterRows = {
    padding: '10px',
    color: '#62728D'
  };
  const horizontalLine = {
    borderTopWidth: '0.75px'
  };
  const inputStyle = {
    background: 'linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)'
  };

  // For arrow
  const ddInputStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23000' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right .75rem center',
    backgroundSize: '8px 10px',
    paddingRight: '2rem'
  };

  const [rows, setRows] = useState([{ id: 1 }]);
  const [grandTotalState, setGrandTotalState] = useState(0);

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

  const { SALE } = SERVICES;

  const onSubmit = (data) => {
    const itemDetails = [];
    // Footer variables
    let total_rate_sum = 0;
    let round_off = 0;
    let vehicle_rent = 0;
    let grand_total = total_rate_sum + round_off + vehicle_rent;
    setGrandTotalState(grand_total);

    rows.forEach((row, index) => {
      // Items
      itemDetails.push({
        item: data[`item_${index}`],
        rate_per_kg: +data[`kg_rate_${index}`],
        hsn_sac: +data[`hsn_sac_${index}`],
        bag_weight: +data[`bag_weight_${index}`],
        qty: +data[`qty_${index}`],
        total_weight: +data[`total_weight_${index}`],
        rate: +data[`rate_${index}`],
        total_rate: +data[`total_rate_${index}`]
      });
      // Footer calculations
      total_rate_sum += +data[`total_rate_${index}`];
    });
    const formData = {
      invoice_number: data.invoice_number,
      sale_date: new Date(data.sale_date),
      customer_name: data.customer_name,
      gst_in: data.gst_in,
      payment_due_date: new Date(data.payment_due_date),
      address: data.address,
      phone: data.phone,
      broker_name: data.broker_name,
      broker_address: data.broker_address,
      broker_phone: data.broker_phone,
      distance: +data.distance,
      transit_mode: data.transit_mode,
      vehicle_no: data.vehicle_no,
      driver_name: data.driver_name,
      driver_phone: data.driver_phone,
      time: data.time,
      supply_location: data.supply_location,
      discount: +data.discount,
      top_rate: +data.top_rate,
      eway_bill_no: data.eway_bill_no,
      gst_percent: +data.gst_percent,
      tcs_percent: +data.tcs_percent,
      items: itemDetails,
      // Footer data
      total_rate_sum: total_rate_sum,
      round_off: round_off,
      vehicle_rent: vehicle_rent,
      grand_total: grand_total
    };
    invokeCreateAPI(SALE.SALE_TYPES.general, formData);
  };

  const invokeCreateAPI = (type, data) => {
    SaleService.createSale({ type, data })
      .then((response) => {
        gsAdded(data);
      })
      .catch((error) => {
        console.log('Error in creating sale', error);
      });
  };

  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Customer data saved');
  // Just a generic method to invoke toaster
  const invokeToaster = (msg, backgroundClr = '#4BB543') => {
    if (msg) {
      setToasterMsg(msg);
    }
    setToasterBackground(backgroundClr);
    setShouldShowToaster(Math.random());
  };
  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Basic Details</Form.Label>
          <hr style={{ horizontalLine }} />
          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Invoice No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('invoice_number', {
                  required: 'Required'
                })}
              />
              {errors.invoice_number && (
                <Form.Text className="text-danger">{errors.invoice_number.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={2}>
              <Form.Label>Sales Date</Form.Label>
              <Form.Control type="date" style={inputStyle} {...register('sale_date', {})} />
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                placeholder="Search Name/Ph. No"
                style={inputStyle}
                {...register('customer_name', {
                  required: 'Required'
                })}
              />
              {errors.customer_name && (
                <Form.Text className="text-danger">{errors.customer_name.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>GSTIN</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('gst_in', {
                  pattern: {
                    value: /^[A-Za-z0-9]{15}$/i,
                    message: 'Invalid GSTIN'
                  }
                })}
              />
              {errors.gst_in && (
                <Form.Text className="text-danger">{errors.gst_in.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={2}>
              <Form.Label>Payment Due Date</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                {...register('payment_due_date', {
                  required: 'Required'
                })}
              />
              {errors.payment_due_date && (
                <Form.Text className="text-danger">{errors.payment_due_date.message}</Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('address', {
                  required: 'Required'
                })}
              />
              {errors.address && (
                <Form.Text className="text-danger">{errors.address.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                {...register('phone', {
                  required: 'Required'
                })}
              />
              {errors.phone && (
                <Form.Text className="text-danger">{errors.phone.message}</Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Broker Name</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('broker_name', {
                  required: 'Required'
                })}
              />
              {errors.broker_name && (
                <Form.Text className="text-danger">{errors.broker_name.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('broker_address', {
                  required: 'Required'
                })}
              />
              {errors.broker_address && (
                <Form.Text className="text-danger">{errors.broker_address.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={2}>
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('broker_phone', {
                  required: 'Required'
                })}
              />
              {errors.broker_phone && (
                <Form.Text className="text-danger">{errors.broker_phone.message}</Form.Text>
              )}
            </Form.Group>
          </Row>
        </div>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Transit Details</Form.Label>
          <hr style={{ horizontalLine }} />
          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Distance</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('distance', {
                  required: 'Required'
                })}
              />
              {errors.distance && (
                <Form.Text className="text-danger">{errors.distance.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>Place of Supply</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('supply_location', {
                  required: 'Required'
                })}
              />
              {errors.supply_location && (
                <Form.Text className="text-danger">{errors.supply_location.message}</Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Vehicle No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('vehicle_no', {
                  required: 'Required'
                })}
              />
              {errors.vehicle_no && (
                <Form.Text className="text-danger">{errors.vehicle_no.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>Driver Name</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('driver_name', {
                  required: 'Required'
                })}
              />
              {errors.driver_name && (
                <Form.Text className="text-danger">{errors.driver_name.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>Driver Phone No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('driver_phone', {
                  required: 'Required'
                })}
              />
              {errors.driver_phone && (
                <Form.Text className="text-danger">{errors.driver_phone.message}</Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>E-Way Bill No.</Form.Label>
              <Form.Control
                style={inputStyle}
                {...register('eway_bill_no', {
                  required: 'Required'
                })}
              />
              {errors.eway_bill_no && (
                <Form.Text className="text-danger">{errors.eway_bill_no.message}</Form.Text>
              )}
            </Form.Group>
          </Row>
        </div>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Goods & Service details</Form.Label>
          <hr style={{ horizontalLine }} />
          <Row className="m-3 mb-0">
            <Form.Group as={Col} xs={2}>
              <Form.Label>Item Details</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>HSN/SAC</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Bag Weight</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Qty.</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Total Weight</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Kg/rate</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Rate</Form.Label>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Total Rate</Form.Label>
            </Form.Group>
          </Row>
          {/* Dynamic Rows */}
          {rows.map((row, index) => (
            <Row className="m-3 mb-0" key={index}>
              <Form.Group as={Col} xs={2}>
                <Form.Select
                  style={{ ...inputStyle, ...ddInputStyle }}
                  {...register(`item_${index}`, {
                    required: 'Select an item'
                  })}>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                {errors[`item_${index}`] && (
                  <Form.Text className="text-danger">{errors[`item_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  type="number"
                  style={inputStyle}
                  {...register(`hsn_sac_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`hsn_sac_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`hsn_sac_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  type="number"
                  style={inputStyle}
                  {...register(`bag_weight_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`bag_weight_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`bag_weight_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  type="number"
                  style={inputStyle}
                  {...register(`qty_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`qty_${index}`] && (
                  <Form.Text className="text-danger">{errors[`qty_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Control
                  type="number"
                  style={inputStyle}
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
                  type="number"
                  style={inputStyle}
                  {...register(`kg_rate_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`kg_rate_${index}`] && (
                  <Form.Text className="text-danger">
                    {errors[`kg_rate_${index}`].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Control
                  type="number"
                  style={inputStyle}
                  {...register(`rate_${index}`, {
                    required: 'Required'
                  })}></Form.Control>
                {errors[`rate_${index}`] && (
                  <Form.Text className="text-danger">{errors[`rate_${index}`].message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Control
                  type="number"
                  style={inputStyle}
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
                      rows.length === 1 || index === rows.length - 1 ? '#00B7FF' : '#BF2600',
                    color: 'white',
                    display: 'flex',
                    borderRadius: '8px',
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
              </Form.Group>
            </Row>
          ))}
          {/* Dynamic Rows */}
          <hr style={{ ...horizontalLine, marginLeft: '28px' }} />
          <Row>
            <Col xs={5}>
              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Discount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    style={inputStyle}
                    {...register('discount', {
                      required: 'Required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Invalid discount amount'
                      }
                    })}
                  />
                  {errors.discount && (
                    <Form.Text className="text-danger">{errors.discount.message}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Top Rate</Form.Label>
                  <Form.Control
                    type="number"
                    style={inputStyle}
                    {...register('top_rate', {
                      required: 'Required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Invalid top rate'
                      }
                    })}
                  />
                  {errors.top_rate && (
                    <Form.Text className="text-danger">{errors.top_rate.message}</Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>GST (%)</Form.Label>
                  <Form.Control
                    type="number"
                    style={inputStyle}
                    {...register('gst_percent', {
                      required: 'Required'
                    })}
                  />
                  {errors.gst_percent && (
                    <Form.Text className="text-danger">{errors.gst_percent.message}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>TCS Value</Form.Label>
                  <Form.Control
                    type="number"
                    style={inputStyle}
                    {...register('tcs_percent', {
                      required: 'Required'
                    })}
                  />
                  {errors.tcs_percent && (
                    <Form.Text className="text-danger">{errors.tcs_percent.message}</Form.Text>
                  )}
                </Form.Group>
              </Row>
            </Col>
            <Col
              xs={4}
              style={{ border: '2px solid #D9D9D9', padding: '10px', borderRadius: '15px' }}>
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
                        <td style={summaztionFooterRows}>Round-Off</td>
                        <td style={summaztionFooterRows}>:</td>
                        <td>₹ 8914</td>
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
                    <p style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                      ₹ {grandTotalState || 0}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={2}></Col>
                <Col lg={4} className="mt-2">
                  <LocalPrintshopOutlinedIcon /> <span>Save & Print </span>
                </Col>
                <Col lg={3}>
                  <Button
                    style={{
                      paddingLeft: '45px',
                      paddingRight: '45px',
                      background: '#00B7FF',
                      borderColor: '#00B7FF'
                    }}
                    variant="primary"
                    type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
      <Toaster
        shouldOpen={shouldShowToaster}
        message={toasterMsg}
        backgroundColor={toasterBackground}></Toaster>
    </Container>
  );
}

export default NewGsForm;
