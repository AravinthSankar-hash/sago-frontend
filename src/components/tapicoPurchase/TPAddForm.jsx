import { useMemo, useRef } from 'react';
import { Container, Form, Row, Col, Dropdown } from 'react-bootstrap';

function TPAddForm() {
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
  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Basic Details</Form.Label>
          <hr style={{ horizontalLine }} />

          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Purchase No.</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Tapico Type</Form.Label>

              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    ...inputStyle,
                    backgroundColor: '#DFE1E6',
                    borderColor: '#DFE1E6',
                    color: '#7A869A',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  id="dropdown-basic">
                  Choose Something
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Action 1 Action 1 Action 1</Dropdown.Item>
                  <Dropdown.Item>Action 2</Dropdown.Item>
                  <Dropdown.Item>Action 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control type="date" style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
          <hr style={{ ...horizontalLine, marginLeft: '28px' }} />

          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Broker Name</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Commission(%)</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Payment Due Date</Form.Label>
              <Form.Control type="date" style={inputStyle}></Form.Control>
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
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Weight Bill No.</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} xs={5}>
              <Form.Label>Farmer Details</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Farmer Aadhar No.</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
        </div>

        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Weightage details</Form.Label>
          <hr style={{ horizontalLine }} />

          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={2}>
              <Form.Label>Total Bags</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Total Weight</Form.Label>

              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Vehicle Weight</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Net Weight</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Sand Weight(%)</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Sand Weight</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Tonnage</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
        </div>

        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Charges details</Form.Label>
          <hr style={{ horizontalLine }} />

          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={2}>
              <Form.Label>Point 1</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Point 2</Form.Label>

              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Point 3</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>Point 4</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>AP</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              <Form.Label>TP</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>P.Rate</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Total Rate</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
          <hr style={{ ...horizontalLine, marginLeft: '28px' }} />
          <Row>
            <Col xs={5}>
              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Farmer Details</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Farmer Aadhar No.</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Farmer Details</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Farmer Aadhar No.</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col}>
                  <Form.Label>Farmer Details</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Farmer Aadhar No.</Form.Label>
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
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
}

export default TPAddForm;
