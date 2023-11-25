import React, { useMemo, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
const CatalogNewBrokerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data);
  // const [scrollable, setScrollable] = useState(true);
  const containerRef = useRef();

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container.scrollHeight > container.clientHeight) {
  //     setScrollable(true);
  //   } else {
  //     setScrollable(false);
  //   }
  // }, []);

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
    color: '#62728D'
  };
  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '80px'
  };

  const inputStyle = {
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`,
    border: '2px solid #DFE1E6'
  };
  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label className="mt-4" style={headingStyle}>
          1. Supplier details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="NewBroformName">
            <Form.Label>
              Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="name"
              {...register('name', { required: 'This field is required' })}
            />
            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="NewBroFormPhone">
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

          <Form.Group as={Col} xs={3} controlId="NewBroFormAltPhone">
            <Form.Label>Alt. Phone No.</Form.Label>
            <Form.Control style={inputStyle} type="tel" {...register('altphone')} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewBroformEmail">
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
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          2. Address details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="NewBroFormAddress">
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
          <Form.Group as={Col} xs={3} controlId="NewBroFormCity">
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
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewBroFormState">
            <Form.Label>
              State<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('state', {
                required: 'This field is required'
              })}
            />
            {errors.state && <Form.Text className="text-danger">{errors.state.message}</Form.Text>}
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
          3. Bank details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="NewBroBankName">
            <Form.Label>
              Bank Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('bankname', {
                required: 'This field is required'
              })}
            />
            {errors.bankname && (
              <Form.Text className="text-danger">{errors.bankname.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="NewBroFormAccNo">
            <Form.Label>
              A/c. no.<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('accountno', {
                required: 'This field is required'
              })}
            />
            {errors.accountno && (
              <Form.Text className="text-danger">{errors.accountno.message}</Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewBroFormIfscCode">
            <Form.Label>
              IFSC code<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('ifscCode', {
                required: 'This field is required'
              })}
            />
            {errors.ifscCode && (
              <Form.Text className="text-danger">{errors.ifscCode.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="NewBroFormOpenBal">
            <Form.Label>Open Balance</Form.Label>
            <Form.Control style={inputStyle} type="number" {...register('openbal')} />
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          4. Other details
        </Form.Label>

        <Row className="mb-3 mt-2">
          <Form.Group as={Col} xs={3} controlId="NewBroFormcom">
            <Form.Label>Commission Percentage(%)</Form.Label>
            <Form.Control style={inputStyle} type="text" {...register('commission')} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewBroFormPanNo">
            <Form.Label>PAN No.</Form.Label>
            <Form.Control style={inputStyle} type="text" {...register('pan')} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} xs={6} controlId="NewBroFormDes">
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
};

export default CatalogNewBrokerForm;
