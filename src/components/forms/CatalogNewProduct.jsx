import React, { useMemo, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const CatalogNewProduct = (props) => {
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
      // fontWeight: '400px',
      // color: '#191C24'
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
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`,
    border: '2px solid #DFE1E6'
  };
  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label className="mt-4" style={headingStyle}>
          1. Product details
          <CloseSharpIcon
            style={{ cursor: 'pointer' }}
            onClick={() => props.showForm(false)}
            fontSize="medium"
          />
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="NewProdformName">
            <Form.Label>
              Product Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="name"
              {...register('productname', { required: 'This field is required' })}
            />
            {errors.productname && (
              <Form.Text className="text-danger">{errors.productname.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewProdformFoodSafety">
            <Form.Label>
              Food Safety <span style={{ color: 'red' }}>*</span>
            </Form.Label>

            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Yes"
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                {...register('foodSafety', { required: 'Please select an option' })}
              />
              <Form.Check
                inline
                label="No"
                name="group1"
                type="radio"
                id={`inline-radio-2`}
                {...register('foodSafety', { required: 'Please select an option' })}
              />
            </div>

            {errors.foodSafety && (
              <Form.Text className="text-danger">{errors.foodSafety.message}</Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="NewProdFormUnit">
            <Form.Label>Unit</Form.Label>
            <Form.Control style={inputStyle} type="text" {...register('unit')} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewProdformHsn">
            <Form.Label>
              HSN Code <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              style={inputStyle}
              type="text"
              {...register('hsncode', {
                required: 'This field is required'
              })}
            />
            {errors.hsncode && (
              <Form.Text className="text-danger">{errors.hsncode.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="NewProdFormTax">
            <Form.Label>Tax %</Form.Label>
            <Form.Control style={inputStyle} type="text" {...register('tax')} />
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          2. Other details
        </Form.Label>

        <Row className="mb-3">
          <Form.Group className="mb-3 mt-3" as={Col} xs={6} controlId="NewProdFormDes">
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

export default CatalogNewProduct;
