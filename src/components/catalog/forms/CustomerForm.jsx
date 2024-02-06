import { useMemo, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
import CatalogService from 'services/catalog.api.js';

function CustomerForm({ customerAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const newCustomer = {
      customer_name: data.name,
      phone: data.phone,
      secondary_phone: data.altphone,
      email: data.email,
      customer_type: data.type,
      address: data.address,
      city: data.city,
      pincode: data.pincode,
      aadhar: data.aadhar,
      gst: data.gst,
      type: 'customer'
    };
    await CatalogService.create({ type: 'PARTNER', data: newCustomer });
    customerAdded(newCustomer);
  };
  const containerRef = useRef();

  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '750px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );
  const headingStyle = {
    color: '#62728D',
    display: 'flex',
    justifyContent: 'space-between'
  };
  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '80px'
  };

  const inputStyle = {
    backgroundImage: 'url("data:image/svg+xml, ...")', // SVG data for the caret icon
    backgroundPosition: 'right 10px top 50%', // Adjust as needed
    backgroundRepeat: 'no-repeat',
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`,
    border: '2px solid #DFE1E6'
  };

  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label className="mt-4" style={headingStyle}>
          1. Customer details
        </Form.Label>

        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="NewCustformName">
            <Form.Label>
              Customer Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="name"
              {...register('name', { required: 'This field is required' })}
            />
            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewCustformType">
            <Form.Label>
              Customer Type <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              defaultValue="GS"
              style={inputStyle}
              // type="select"
              {...register('type', { required: 'This field is required' })}>
              <option value="GS">GS</option>
              <option value="TS">TS</option>
              <option value="DC">DC</option>
            </Form.Select>
            {errors.type && <Form.Text className="text-danger">{errors.type.message}</Form.Text>}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewCustFormPhone">
            <Form.Label>
              Phone No. <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="tel"
              {...register('phone', {
                required: 'This field is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid phone number'
                },
                maxLength: 10
              })}
            />
            {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewCustFormAltPhone">
            <Form.Label>Alt. Phone No.</Form.Label>
            <Form.Control style={inputStyle} type="tel" {...register('altphone')} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewCustformEmail">
            <Form.Label>
              E-mail <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address'
                }
              })}
            />
            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewCustFormAadhar">
            <Form.Label>
              Aadhar No. <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('aadhar', {
                pattern: {
                  value: /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}/,
                  message: 'Enter a valid Aadhar number'
                },
                required: 'This field is required'
              })}
            />
            {errors.aadhar && (
              <Form.Text className="text-danger">{errors.aadhar.message}</Form.Text>
            )}
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          2. Address details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={6} controlId="NewCustFormAddress">
            <Form.Label>
              Address <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('address', {
                required: 'This field is required'
              })}
            />
            {errors.address && (
              <Form.Text className="text-danger">{errors.address.message}</Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewCustFormCity">
            <Form.Label>
              City<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('city', {
                required: 'This field is required'
              })}
            />
            {errors.city && <Form.Text className="text-danger">{errors.city.message}</Form.Text>}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewCustFormPincode">
            <Form.Label>
              Pincode <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('pincode', {
                required: 'This field is required',
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: 'Enter a valid six-digit PIN code'
                }
              })}
            />
            {errors.pincode && (
              <Form.Text className="text-danger">{errors.pincode.message}</Form.Text>
            )}
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          3. Other details
        </Form.Label>

        <Row className="mb-3 mt-2">
          <Form.Group as={Col} xs={3} controlId="NewCustFormGstNo">
            <Form.Label>
              GST No. <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('gst', {
                required: 'GST Number is required',
                pattern: {
                  value: /^\d{15,}$/i,
                  message: 'Invalid GST Number format'
                }
              })}
            />
            {errors.gst && <Form.Text className="text-danger">{errors.gst.message}</Form.Text>}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewCustFormPanNo">
            <Form.Label>PAN No.</Form.Label>
            <Form.Control style={inputStyle} type="text" {...register('pan')} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} xs={6} controlId="NewCustFormDes">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              style={inputStyle}
              type="text"
              {...register('description')}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" className="mb-4" type="submit" style={buttonStyle}>
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerForm;
