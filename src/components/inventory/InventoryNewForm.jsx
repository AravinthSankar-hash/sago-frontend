import { useMemo, useRef } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import inventoryService from '../../services/inventory.api';

const InventoryNewForm = ({ inventoryAdded }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const formData = {
      entry_date: new Date(data.entry_date),
      product_name: data.product_name,
      total_bags: +data.total_bags
    };
    await inventoryService.create({ type: 'INVENTORY', data: formData });
    inventoryAdded(formData);
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

  const inputStyle = {
    background: `linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)`
  };

  const ddInputStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23000' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right .75rem center',
    backgroundSize: '8px 10px',
    paddingRight: '2rem'
  };

  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Form className="m-4" style={{ height: '400px' }} onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3}>
            <Form.Label>Entry Date</Form.Label>
            <Form.Control
              type="date"
              style={inputStyle}
              {...register('entry_date', {
                required: 'Entry Date is required',
                pattern: {
                  value: /\d{4}-\d{2}-\d{2}/,
                  message: 'Please enter a valid date (YYYY-MM-DD)'
                }
              })}></Form.Control>
            {errors.entry_date && (
              <Form.Text className="text-danger">{errors.entry_date.message}</Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3}>
            <Form.Label>Product Name</Form.Label>
            <Form.Select
              style={{ ...inputStyle, ...ddInputStyle }}
              {...register('product_name', {
                required: 'Select an item'
              })}>
              <option value="sago">Sago</option>
              <option value="broken">Broken</option>
              <option value="wet_tippi">Wet Thippi</option>
              <option value="dry_tippi">Dry Thippi</option>
              <option value="starch">Starch</option>
            </Form.Select>
            {errors.product_name && (
              <Form.Text className="text-danger">{errors.product_name.message}</Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} xs={3}>
            <Form.Label>Total Bags</Form.Label>
            <Form.Control
              style={inputStyle}
              {...register('total_bags', {
                required: 'Required'
              })}
            />
            {errors.total_bags && (
              <Form.Text className="text-danger">{errors.total_bags.message}</Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-2 mt-5">
          <Form.Group
            lg="2"
            as={Col}
            controlId="NewCustformBtn"
            style={{ height: '15px', display: 'grid' }}>
            <Button
              variant="primary"
              style={{ backgroundColor: '#00B7FF', border: 'none' }}
              type="submit">
              Save
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default InventoryNewForm;
