import React, { useMemo, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import CameraIcon from '@mui/icons-material/Camera';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const CatalogNewStaff = (props) => {
  // const [focusedInput, setFocusedInput] = useState(null);

  const {
    register,
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
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`
    // border: '2px solid ##00B7FF'
  };
  // const handleFocus = (fieldName) => {
  //   setFocusedInput(fieldName);
  // };

  // const handleBlur = () => {
  //   setFocusedInput(null);
  // };
  // const getInputStyle = (fieldName) => ({
  //   background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`,
  //   border: focusedInput === fieldName ? '2px solid #00B7FF' : '1px solid #ced4da',
  //   ...(fieldName === 'profilePic' && { borderRadius: '50%' }) // Apply circular border radius
  // });

  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 mt-3">
          <Form.Group controlId="NewStaffFormProfilePic">
            {/* <Form.Label style={{ display: 'flex', justifyContent: 'space-between' }}>
              Profile Picture <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control type="file" /> */}
            <Avatar
              alt="Upload"
              sx={{ width: 100, height: 100, cursor: 'pointer', border: '2px solid #DFE1E6' }}>
              <AddAPhotoIcon />
            </Avatar>
            {/* <Form.File
            {...register('profilePic', { required: 'Please upload a profile picture' })}
            /> */}
            {/* <Form.File
            className={focusedInput === 'profilePic' ? 'circular-profile-pic' : ''}
            style={getInputStyle('profilePic')} // Adjust styling if needed
            {...register('profilePic', { required: 'Please upload a profile picture' })}
            onFocus={() => handleFocus('profilePic')}
            onBlur={handleBlur}
          /> */}
            {/* {errors.profilePic && (
              <Form.Text className="text-danger">{errors.profilePic.message}</Form.Text>
            )} */}
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          1. Staff details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="NewStaffFormName">
            <Form.Label>
              Staff Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="name"
              {...register('staffname', { required: 'This field is required' })}
            />
            {errors.staffname && (
              <Form.Text className="text-danger">{errors.staffname.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewStaffFormPhone">
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
          <Form.Group as={Col} xs={3} controlId="NewStaffFormAltPhone">
            <Form.Label>Alt. Phone No.</Form.Label>
            <Form.Control style={inputStyle} type="tel" {...register('altphone')} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewStaffformEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control style={inputStyle} type="email" {...register('email', {})} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewStaffFormDesignation">
            <Form.Label>
              Designation <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('designation', {
                // pattern: {
                //   value: /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}/,
                //   message: 'Enter a valid Aadhar number'
                // },
                required: 'This field is required'
              })}
            />
            {errors.designation && (
              <Form.Text className="text-danger">{errors.designation.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewStaffFormQualification">
            <Form.Label>Qualification</Form.Label>
            <Form.Control style={inputStyle} type="text" {...register('email')} />
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          2. Address details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={6} controlId="NewStaffFormAddress">
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
          <Form.Group as={Col} xs={3} controlId="NewStaffFormCity">
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

          <Form.Group as={Col} xs={3} controlId="NewStaffFormPincode">
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
          <Form.Group as={Col} xs={3} controlId="NewStaffFormAadhar">
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

          <Form.Group as={Col} xs={3} controlId="NewStaffFormPanNo">
            <Form.Label>
              PAN No. <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('pan', { required: 'This field is required' })}
            />
            {errors.pan && <Form.Text className="text-danger">{errors.pan.message}</Form.Text>}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} xs={6} controlId="NewStaffFormDes">
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

export default CatalogNewStaff;
