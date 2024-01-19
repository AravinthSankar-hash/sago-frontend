import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Container, Form, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { useRef, useMemo, useState } from 'react';
import { IconButton } from '@mui/material';

function NewTsForm() {
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

  const [itemRowCount, setItemRowCount] = useState(1);
  const itemAddDeleteClicked = (isAdd, rowKey) => {
    if (isAdd) {
      addItemRow();
      return;
    }
    deleteItemRow(rowKey);
  };
  const deleteItemRow = (rowKey) => {
    // console.log(inputSaleItems);
    /* const updatedInputItems = inputSaleItems.filter((saleItemElement) => {
      saleItemElement.key !== rowKey;
    });
    setInputsaleItems(updatedInputItems); */
  };
  const addItemRow = () => {
    setItemRowCount((prevCount) => {
      const newCount = prevCount + 1;

      const currentArraySize = Array.from({ length: newCount });
      const saleItemsRows = currentArraySize.map((ele, idx) => {
        return (
          <Row className="m-3 mb-0" key={idx + 1}>
            {staticFormGroup}
            <Form.Group as={Col} xs={1}>
              <div
                onClick={() => itemAddDeleteClicked(idx + 1 === currentArraySize.length, idx + 1)}
                style={{
                  height: '40px',
                  width: '42px',
                  background: idx + 1 === currentArraySize.length ? '#00B7FF' : '#BF2600',
                  color: 'white',
                  display: 'flex',
                  borderRadius: '8px',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {idx + 1 === currentArraySize.length ? (
                  <AddSharpIcon />
                ) : (
                  <DeleteOutlineOutlinedIcon />
                )}
              </div>
            </Form.Group>
          </Row>
        );
      });

      setInputsaleItems(saleItemsRows);

      return newCount;
    });
  };
  const staticFormGroup = (
    <>
      <Form.Group as={Col} xs={2}>
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
            <Dropdown.Item>Thippi</Dropdown.Item>
            <Dropdown.Item>Action 2 Action 1 Action 1</Dropdown.Item>
            <Dropdown.Item>Action 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={2}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={2}>
        <Form.Control style={inputStyle}></Form.Control>
      </Form.Group>
    </>
  );
  const [inputSaleItems, setInputsaleItems] = useState(
    <Row className="m-3 mb-0">
      {staticFormGroup}
      <Form.Group as={Col} xs={1}>
        <div
          onClick={addItemRow}
          style={{
            height: '40px',
            width: '42px',
            background: '#00B7FF',
            color: 'white',
            display: 'flex',
            borderRadius: '8px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <AddSharpIcon />
        </div>
      </Form.Group>
    </Row>
  );

  const [rows, setRows] = useState([{ id: 1 }]);

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

  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Basic Details</Form.Label>
          <hr style={{ horizontalLine }} />
          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Invoice No.</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Sales Date</Form.Label>
              <Form.Control type="date" style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control placeholder="Search Name/Ph. No" style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>GSTIN</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Payment Due Date</Form.Label>
              <Form.Control type="date" style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <p>22/13 Bajanai koil 2nd street, AECS Layout, Choolaimedu chennai-94</p>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Phone No.</Form.Label>
              <p>1234567890</p>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Broker Name</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>Phone No</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
        </div>
        <div style={formGrpStyle}>
          <Form.Label className="m-4 mb-0">Transit Details</Form.Label>
          <hr style={{ horizontalLine }} />
          <Row className="m-3 mb-4">
            <Form.Group as={Col} xs={4}>
              <Form.Label>Freight Mode</Form.Label>
              <div className="mt-1" style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Check inline label="Rental" name="group1" type="radio" />
                <Form.Check inline label="Company Owned" name="group1" type="radio" />
                <Form.Check inline label="Parcel" type="radio" />
              </div>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Transit Mode</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Vechile No.</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}></Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Driver Name</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Time</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={1}></Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Place of Supply</Form.Label>
              <Form.Control style={inputStyle}></Form.Control>
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
              {staticFormGroup}
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
                  <Form.Label>Top Rate</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Discount</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} xs={6}>
                  <Form.Label>GST (%)</Form.Label>
                  <Form.Control style={inputStyle}></Form.Control>
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
                    <p style={{ textAlign: 'center', fontWeight: 'bolder' }}>₹ 10,944</p>
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
                    variant="primary">
                    Save
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
}

export default NewTsForm;
