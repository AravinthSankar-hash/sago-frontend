import { useState } from 'react';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Container, Form, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { TextField, IconButton, Grid } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const YourComponent = () => {
  const inputStyle = {
    background: 'linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)'
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

  const [rows, setRows] = useState([{ id: 1 }]);

  const handleButtonClick = (index) => {
    if (index === rows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: rows.length + 1 };
      setRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setRows((prevRows) => prevRows.filter((row, indexToDelete) => indexToDelete !== index));
    }
  };

  return (
    <div>
      {rows.map((row, index) => (
        <Row className="m-3 mb-0" key={row.id}>
          {staticFormGroup}
          <Form.Group as={Col} xs={1}>
            <div
              style={{
                height: '40px',
                width: '42px',
                background: rows.length === 1 || index === rows.length - 1 ? '#00B7FF' : '#BF2600',
                color: 'white',
                display: 'flex',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <IconButton onClick={() => handleButtonClick(index)}>
                {index === rows.length - 1 ? <AddSharpIcon /> : <DeleteOutlineOutlinedIcon />}
              </IconButton>
            </div>
          </Form.Group>
        </Row>
      ))}
    </div>
  );
};

export default YourComponent;
