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
import '../../css/index.css';

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
                // placeholder="8941555367"
                defaultValue="8941555367"
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

            <Form.Group as={Col} controlId="NewCustformEmail" style={{ height: '40px' }}>
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
          {/* <div className='table-responsive'> */}
          <table style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
            <thead style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}>
              <tr>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Purchase Name</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Product Type</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Rate</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Quantity</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Units</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Amount</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Action</th>
              </tr>
            </thead>

            <tbody style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C', padding: '20px' }}>
              <tr>
                <td style={{ padding: '10px' }}>
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
                    <Select labelId="demo-select-small-label" label="Select Work">
                      <MenuItem value={10}>Select</MenuItem>
                      <MenuItem value={20}>Lorem</MenuItem>
                      <MenuItem value={30}>Ipsum</MenuItem>
                    </Select>
                  </FormControl>
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
                      disabled
                    />
                  </Form.Group>
                </td>
                <td style={{ padding: '10px' }}>
                  <Form.Group as={Col}>
                    <Form.Control
                      style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                      defaultValue={10}
                      type="text"
                      //   disabled
                    />
                  </Form.Group>
                </td>
                <td style={{ padding: '10px' }}>
                  {' '}
                  <Form.Group as={Col}>
                    <Form.Control
                      style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                      defaultValue="30,000"
                      type="text"
                      //   disabled
                    />
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
                      defaultValue="Snacks"
                      disabled
                    />
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
                      disabled
                    />
                  </Form.Group>
                </td>
                <td style={{ padding: '10px' }}>
                  {' '}
                  <div
                    style={{
                      height: '40px',
                      width: '40px',
                      background: '#BF2600',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <DeleteOutlineOutlinedIcon />
                  </div>{' '}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>
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
                    <InputLabel id="demo-select-small-label" style={{ color: '#7A869A' }}>
                      Lorem ipsum
                    </InputLabel>
                    <Select labelId="demo-select-small-label" label="Select Work">
                      <MenuItem value={10}>Select</MenuItem>
                      <MenuItem value={20}>Lorem</MenuItem>
                      <MenuItem value={30}>Ipsum</MenuItem>
                    </Select>
                  </FormControl>
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
                      defaultValue="None"
                      disabled
                    />
                  </Form.Group>
                </td>
                <td style={{ padding: '10px' }}>
                  <Form.Group as={Col}>
                    <Form.Control
                      style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                      type="text"
                      //   disabled
                    />
                  </Form.Group>
                </td>
                <td style={{ padding: '10px' }}>
                  <Form.Group as={Col}>
                    <Form.Control
                      style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                      type="text"
                      //   disabled
                    />
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
                      defaultValue="Unit"
                      disabled
                    />
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
                      defaultValue="₹ 0"
                      disabled
                    />
                  </Form.Group>
                </td>
                <td style={{ padding: '10px' }}>
                  {' '}
                  <div
                    style={{
                      height: '40px',
                      width: '40px',
                      background: '#00B7FF',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <AddSharpIcon />
                  </div>
                </td>
              </tr>
            </tbody>
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
                <td>₹ 8,944</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Discount:</td>
                <td>
                  <Form.Control
                    style={{
                      background: '#F4F5F7',
                      color: '#A5ADBA',
                      border: 'none',
                      width: '100px',
                      height: '40px'
                    }}
                    defaultValue=""
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Tax Rate:</td>
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
                    placeholder=""
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Tax:</td>
                <td>₹ 0</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                  purchase Total :
                </td>
                <td>₹ 2,58,456.00/-</td>
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
                    defaultValue="₹ 0"
                    disabled
                  />
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
        </Form>
      </Container>
    </>
  );
};

export default NewProcurement;
