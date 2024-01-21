import { useState, useMemo, useRef } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import { useForm } from 'react-hook-form';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { IconButton } from '@mui/material';
import '../../css/index.css';

const ExpenseForm = () => {
  const {
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
      maxHeight: '500px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );
  const attachStyle = {
    color: '#62728D',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const buttonStyle = {
    backgroundColor: '#00B7FF',
    width: '140px',
    border: 'none'
  };

  // Dynamic expense item row - start

  const staticExpenseItemRow = (
    <>
      <td style={{ padding: '10px' }}>
        <Form.Group as={Col}>
          {/* <Form.Label>Party Name</Form.Label> */}
          <Form.Control
            style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
            defaultValue={'Lorem Ipsum'}
            type="text"
            //   disabled
          />
        </Form.Group>
      </td>
      <td style={{ padding: '10px' }}>
        {' '}
        <Form.Group as={Col}>
          <Form.Control
            style={{
              background: '#F4F5F7',
              color: '#A5ADBA',
              border: 'none',
              padding: '9px 12px'
            }}
            defaultValue="₹ 3,00,00,000"
            disabled
          />
        </Form.Group>
      </td>
    </>
  );

  const [expenseItemRows, setExpenseItemRows] = useState([{ id: 1 }]);

  const handleExpenseItemRowsButtonClick = (index) => {
    if (index === expenseItemRows.length - 1) {
      // If it's the last row, add a new row
      const newRow = { id: expenseItemRows.length + 1 };
      setExpenseItemRows((prevRows) => [...prevRows, newRow]);
    } else {
      // If it's not the last row, delete the current row
      setExpenseItemRows((prevRows) => {
        return prevRows.filter((row, indexToDelete) => indexToDelete !== index);
      });
    }
  };

  // Dynamic expense item row - end

  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3 mt-3" style={{ borderBottom: '1px solid #EBEEF0' }}>
            <Col>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Expense No.
              </p>
              <p style={{ fontSize: '12px' }}>EXP4533</p>
            </Col>

            <Form.Group as={Col} xs={3} controlId="NewProPurchaseNo">
              <Form.Label
                className="m-2 d-flex justify-content-end"
                style={attachStyle}
                onClick={handleIconClick}>
                <AttachFileOutlinedIcon fontSize={'small'} />
                Attachments (0)
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                  }}
                />
              </Form.Label>
              {errors.attachment && (
                <Form.Text className="text-danger">{errors.attachment.message}</Form.Text>
              )}
            </Form.Group>
            <Col lg="1">
              <MoreVertOutlinedIcon style={{ color: '#B2B3B7' }} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} lg="3">
              <Form.Label>Party Name</Form.Label>
              <Form.Control
                style={{ background: '#FAFBFC', color: '#7A869A', padding: '9px 12px' }}
                // defaultValue={'Par'}
                type="text"
                //   disabled
              />
            </Form.Group>
            {/* <Row className="mb-3"> */}
            <Form.Group as={Col} lg="3" style={{ display: 'grid' }}>
              <Form.Label>Expense Type</Form.Label>
              <FormControl
                sx={{
                  minWidth: '100%',
                  // marginTop: '0px',
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
            {/* </Row> */}

            <Form.Group
              as={Col}
              controlId="NewCustformEmail"
              style={{ height: '40px', display: 'grid' }}>
              <Form.Label>Expense Date</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker disableFuture />
              </LocalizationProvider>
            </Form.Group>

            <Form.Group as={Col} controlId="NewCustformEmail" style={{ display: 'grid' }}>
              <Form.Label>Purchase Due Date</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Form.Group>
          </Row>
        </Form>
      </Container>
      <Container ref={containerRef} className="ag-theme-alpine mt-5" style={gridStyle}>
        <Form className="m-4" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className='table-responsive'> */}
          <table style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
            <thead style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}>
              <tr>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Expense Description</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}>Amount</th>
                <th style={{ paddingBottom: '10px', padding: '10px' }}></th>
              </tr>
            </thead>

            {expenseItemRows.map((row, index) => (
              <tbody key={index}>
                <tr>
                  {staticExpenseItemRow}

                  <td style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        height: '40px',
                        width: '40px',
                        background:
                          expenseItemRows.length === 1 || index === expenseItemRows.length - 1
                            ? '#00B7FF'
                            : '#BF2600',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <IconButton onClick={() => handleExpenseItemRowsButtonClick(index)}>
                        {index === expenseItemRows.length - 1 ? (
                          <AddSharpIcon style={{ color: 'white' }} />
                        ) : (
                          <DeleteOutlineOutlinedIcon style={{ color: 'white' }} />
                        )}
                      </IconButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {/* <div  className='float-end'> */}
          <table
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              marginTop: '20px',
              marginBottom: '20px',
              paddingRight: '50px'
            }}>
            <tbody>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                  Sub Total:
                </td>
                <td>₹ 8,944</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Discount:</td>
                <td>
                  <Form.Control
                    style={{
                      background: '#F4F5F7',
                      color: '#A5ADBA',
                      border: 'none',
                      width: '100px',
                      height: '40px'
                    }}
                    defaultValue=""
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Tax Rate:</td>
                <td>
                  {' '}
                  <Form.Control
                    style={{
                      background: '#F4F5F7',
                      color: '#A5ADBA',
                      border: 'none',
                      width: '100px',
                      height: '40px'
                    }}
                    placeholder=""
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>Tax:</td>
                <td>₹ 0</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5C9EB8' }}>
                  purchase Total :
                </td>
                <td>₹ 2,58,456.00/-</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
              <tr>
                <td style={{ padding: '10px', paddingBottom: '30px', color: '#5C9EB8' }}>
                  Initial Payment Paid :
                </td>
                <td>
                  <Form.Control
                    style={{
                      background: '#F4F5F7',
                      color: '#A5ADBA',
                      border: 'none',
                      width: '150px',
                      height: '40px'
                    }}
                    defaultValue="₹ 0"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {/* </div> */}
          <Row>
            <div style={{ color: '#62728D', textDecoration: 'Underline', marginTop: '0' }}>
              <LocalPrintshopOutlinedIcon />{' '}
              <span style={{ marginLeft: '5px' }}>Save & Print </span>
              <Button variant="primary" className="m-5" type="submit" style={buttonStyle}>
                Save
              </Button>
            </div>
          </Row>
          {/* </div> */}
        </Form>
      </Container>
    </>
  );
};

export default ExpenseForm;
