import React, { useMemo, useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import '../css/catalogNewCust.css';

function CatalogNewCustForm() {
  const [scrollable, setScrollable] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container.scrollHeight > container.clientHeight) {
      setScrollable(true);
    } else {
      setScrollable(false);
    }
  }, []);

  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: scrollable ? 'auto' : 'hidden',
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
    <Container
      ref={containerRef}
      className="ag-theme-alpine agrid-custom-height mt-4"
      style={gridStyle}>
      <Form className="m-4">
        <Form.Label className="mt-4" style={headingStyle}>
          1. Customer details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3} controlId="formGridCity">
            <Form.Label>
              Customer Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridState">
            <Form.Label>
              Customer Type <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Select defaultValue="Choose..." style={inputStyle}>
              <option>Choose Something</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridZip">
            <Form.Label>
              Phone No. <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="formGridCity">
            <Form.Label>Alt. Phone No.</Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridEmail">
            <Form.Label>
              E-mail <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} type="test" />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridZip">
            <Form.Label>
              Aadhar No. <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          2. Address details
        </Form.Label>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={6} controlId="formGridEmail">
            <Form.Label>
              Address <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} type="test" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="formGridCity">
            <Form.Label>
              City<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridZip">
            <Form.Label>
              Pincode <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>
        </Row>

        <Form.Label className="mt-4" style={headingStyle}>
          3. Other details
        </Form.Label>

        <Row className="mb-3 mt-2">
          <Form.Group as={Col} xs={3} controlId="formGridCity">
            <Form.Label>GST No.</Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridZip">
            <Form.Label>PAN No.</Form.Label>
            <Form.Control style={inputStyle} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} xs={6} controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={5} style={inputStyle} />
          </Form.Group>
        </Row>
        <Button variant="primary" className="mb-4" type="submit" style={buttonStyle}>
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default CatalogNewCustForm;
