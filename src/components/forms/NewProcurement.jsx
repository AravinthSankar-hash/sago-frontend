import React, { useMemo, useRef } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SearchBox from '../SearchBox';
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

const NewProcurement = () => {
  const {
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data);
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

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '140px',
    border: 'none'
  };

  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3 mt-3" style={{ borderBottom: '1px solid #EBEEF0' }}>
            <Col>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Purchase No.
              </p>
              <p style={{ fontSize: '12px' }}>PRO4533</p>
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
              <SearchBox placeHolder={'Search Name/Ph no.'} />
              {/* <Form.Control
                style={inputStyle}
                //   type="tel"
                //   {...register('altphone')}
              /> */}
            </Form.Group>

            <Form.Group as={Col} xs={3} controlId="NewProPhone">
              <Form.Label>Phone no.</Form.Label>
              <Form.Control
                style={{ background: '#F4F5F7', color: '#A5ADBA', border: 'none' }}
                placeholder="8941555367"
                type="tel"
                disabled
                // {...register('phone', {
                //   required: 'This field is required',
                //   pattern: {
                //     value: /^[0-9]{10}$/,
                //     message: 'Enter a valid phone number'
                //   },
                //   maxLength: 10
                // })}
              />
              {/* {errors.phone && (
                <Form.Text className="text-danger">{errors.phone.message}</Form.Text> */}
            </Form.Group>

            <Form.Group as={Col} controlId="NewCustformEmail">
              <Form.Label>Purchase Date</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker disableFuture />
              </LocalizationProvider>
            </Form.Group>

            <Form.Group as={Col} controlId="NewCustformEmail">
              <Form.Label>Purchase Due Date</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Form.Group>
          </Row>
          <Row>
            <p className="mb-1" style={{ color: '#62728D' }}>
              Address
            </p>
            <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
          </Row>
        </Form>
      </Container>

      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
          <Row
            className="mb-4 mt-5 pb-3"
            style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}>
            <Col lg="2">Purchase Name</Col>
            <Col lg="2">Product Type</Col>
            <Col lg="1">Rate</Col>
            <Col lg="2">Quantity</Col>
            <Col lg="1">Units</Col>
            <Col lg="3">Amount</Col>
            <Col lg="1">Action</Col>
          </Row>

          <Row className="mb-4">
            <Col lg="2">
              <FormControl
                sx={{
                  minWidth: 150,
                  marginTop: '0px',
                  color: '#DFE1E6',
                  background: '#FAFBFC',
                  border: '2px solid #FAFBFC'
                }}
                size="small">
                <InputLabel id="demo-select-small-label">Lorem ipsum</InputLabel>
                <Select labelId="demo-select-small-label" label="Select Work">
                  <MenuItem value={10}>Select</MenuItem>
                  <MenuItem value={20}>Lorem</MenuItem>
                  <MenuItem value={30}>Ipsum</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col lg="2">
              <Form.Group as={Col}>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    padding: '9px 12px'
                  }}
                  placeholder="Machinery"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg="1">
              <Form.Group as={Col}>
                <Form.Control
                  style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                  placeholder={10}
                  type="text"
                  //   disabled
                />
              </Form.Group>
            </Col>
            <Col lg="2">
              <Form.Group as={Col}>
                <Form.Control
                  style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                  placeholder={30000}
                  type="text"
                  //   disabled
                />
              </Form.Group>
            </Col>
            <Col lg="1">
              <Form.Group as={Col}>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    padding: '9px 12px'
                  }}
                  placeholder="Snacks"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg="3">
              <Form.Group as={Col}>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    padding: '9px 12px'
                  }}
                  placeholder="₹ 3,00,00,000"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg="1">
              <div
                style={{
                  height: '40px',
                  width: '40px',
                  background: '#BF2600',
                  color: 'white'
                }}>
                <DeleteOutlineOutlinedIcon />
              </div>
            </Col>
          </Row>

          <Row
            className="mb-3 pb-4"
            style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}>
            <Col lg="2">
              <FormControl
                sx={{
                  minWidth: 150,
                  marginTop: '0px',
                  color: '#DFE1E6',
                  background: '#FAFBFC',
                  border: '2px solid #FAFBFC'
                  //   width: '184px'
                }}
                size="small">
                <InputLabel id="demo-select-small-label">Lorem ipsum</InputLabel>
                <Select labelId="demo-select-small-label" label="Select Work">
                  <MenuItem value={10}>Select</MenuItem>
                  <MenuItem value={20}>Lorem</MenuItem>
                  <MenuItem value={30}>Ipsum</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col lg="2">
              <Form.Group as={Col}>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    padding: '9px 12px'
                  }}
                  placeholder="None"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg="1">
              <Form.Group as={Col}>
                <Form.Control
                  style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                  type="text"
                  //   disabled
                />
              </Form.Group>
            </Col>
            <Col lg="2">
              <Form.Group as={Col}>
                <Form.Control
                  style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                  type="text"
                  //   disabled
                />
              </Form.Group>
            </Col>
            <Col lg="1">
              <Form.Group as={Col}>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    padding: '9px 12px'
                  }}
                  placeholder="Unit"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg="3">
              <Form.Group as={Col}>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    padding: '9px 12px'
                  }}
                  placeholder="₹ 0"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg="1">
              <div
                style={{
                  height: '40px',
                  width: '40px',
                  background: '#00B7FF',
                  color: 'white',
                  alignItems: 'center'
                }}>
                <AddSharpIcon />
              </div>
            </Col>
          </Row>
          <Row style={{ marginRight: '100px' }}>
            <Col lg="9"></Col>
            <Col>
              <div className="d-flex justify-content-evenly mt-3">
                <p
                  style={{
                    color: '#5C9EB8'
                  }}>
                  Sub Total:
                </p>
                <p>₹ 8,944</p>
              </div>
            </Col>
          </Row>
          <Row style={{ marginRight: '80px' }}>
            <Col lg="9"></Col>
            <Col>
              <div className="d-flex justify-content-evenly">
                <p
                  style={{
                    color: '#5C9EB8'
                  }}>
                  Discount:
                </p>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    width: '100px',
                    height: '40px'
                  }}
                  placeholder=""
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginRight: '80px' }}>
            <Col lg="9"></Col>
            <Col>
              <div className="d-flex justify-content-evenly mt-2">
                <p
                  style={{
                    color: '#5C9EB8'
                  }}>
                  Tax Rate:
                </p>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    width: '100px',
                    height: '40px'
                  }}
                  placeholder=""
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginRight: '100px' }}>
            <Col lg="9"></Col>
            <Col>
              <div className="d-flex justify-content-evenly mt-2">
                <p
                  style={{
                    color: '#5C9EB8'
                  }}>
                  Tax:
                </p>
                <p>₹ 0</p>
              </div>
            </Col>
          </Row>
          <Row style={{ marginRight: '80px' }}>
            <Col lg="9"></Col>
            <Col>
              <hr></hr>
            </Col>
          </Row>
          <Row style={{ marginRight: '100px' }}>
            <Col lg="9"></Col>
            <Col>
              <div className="d-flex justify-content-evenly mt-3">
                <p
                  style={{
                    color: '#5C9EB8'
                  }}>
                  purchase Total :
                </p>
                <p>₹ 2,58,456.00/-</p>
              </div>
            </Col>
          </Row>
          <Row style={{ marginRight: '80px' }}>
            <Col lg="9"></Col>
            <Col>
              <hr></hr>
            </Col>
          </Row>
          <Row style={{ marginRight: '20px' }}>
            <Col lg="8"></Col>
            <Col>
              <div className="d-flex justify-content-evenly mb-4 mt-3">
                <p
                  style={{
                    color: '#5C9EB8'
                  }}>
                  Initial Payment Paid :
                </p>
                <Form.Control
                  style={{
                    background: '#F4F5F7',
                    color: '#A5ADBA',
                    border: 'none',
                    width: '150px',
                    height: '40px'
                  }}
                  placeholder="₹ 0"
                  disabled
                />
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
        </Form>
      </Container>
    </>
  );
};

export default NewProcurement;
