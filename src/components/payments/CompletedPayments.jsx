import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import DateSelector from '../helper/DateSelector.jsx';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../css/index.css';
import ExpenseTable from '../Expense/ExpenseTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const CompletedPayments = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/procurement')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setExpenseData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowDetails = (shouldShow, rowData) => {
    setRowData(rowData);
    setShowDetails(shouldShow);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };
  return (
    <div style={{ padding: '0 12px', margin: '0 28px' }}>
      <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
        <Row>
          <Col lg="2">
            <FormControl
              sx={{ m: 1, minWidth: 220, marginTop: '0px', backgroundColor: 'white' }}
              size="small">
              <InputLabel id="demo-select-small-label">Select Payment type</InputLabel>
              <Select labelId="demo-select-small-label" label="Select Payment type">
                <MenuItem value={10}>Wage</MenuItem>
                <MenuItem value={20}>Cleaning</MenuItem>
                <MenuItem value={30}>Manager</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col lg="2">
            <DateSelector customLabel="From"></DateSelector>
          </Col>
          <Col lg="2">
            <DateSelector customLabel="To"></DateSelector>
          </Col>
          <Col lg="5" className="d-flex justify-content-end">
            <IconButton size="small">
              <IosShareIcon
                fontSize="small"
                style={{
                  wordSpacing: 1
                }}
              />
              Export Data
            </IconButton>
          </Col>
        </Row>
      </div>
      <div>
        {expenseData.length > 0 ? (
          <ExpenseTable
            tableData={expenseData}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleShowDetails={handleShowDetails}
          />
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default CompletedPayments;
