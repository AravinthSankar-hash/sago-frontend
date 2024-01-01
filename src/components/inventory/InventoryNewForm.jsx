import { useMemo, useRef } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const InventoryNewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const containerRef = useRef();

  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '500px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );

  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form className="m-4" style={{ height: '400px' }} onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} lg="3" style={{ display: 'grid' }}>
            <Form.Label>Product Name</Form.Label>
            <FormControl
              sx={{
                minWidth: '100%',
                color: '#DFE1E6',
                background: '#FAFBFC',
                border: '2px solid #FAFBFC'
              }}
              size="small">
              <InputLabel id="demo-select-small-label" style={{ color: '#7A869A' }}>
                Select
              </InputLabel>
              <Select labelId="demo-select-small-label" label="Select Work">
                <MenuItem value={10}>Select</MenuItem>
                <MenuItem value={20}>Lorem</MenuItem>
                <MenuItem value={30}>Ipsum</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} lg="3">
            <Form.Label>Total Bags</Form.Label>
            <Form.Control
              style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
              type="text"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            lg="3"
            as={Col}
            controlId="NewCustformEmail"
            style={{ height: '10px', display: 'grid' }}>
            <Form.Label>Entry Date</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker disableFuture />
            </LocalizationProvider>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default InventoryNewForm;
