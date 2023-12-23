import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SearchBox from '../../components/SearchBox.jsx';
import DateSelector from '../../components/DateSelector.jsx';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../css/index.css';
import ExpenseTable from '../../components/Expense/ExpenseTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function PendingPayments() {
  const [expenseData, setExpenseData] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
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

  const filterOptions = ['All', 'Sales', 'Procurement', 'Expense', 'Topico Purchase'];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowDetails = (shouldShow, rowData) => {
    setRowData(rowData);
    setShowDetails(shouldShow);
  };

  const chipStyle = (isSelected) => ({
    border: '2px solid #00b7ff',
    borderRadius: '8px',
    backgroundColor: isSelected ? '#00b7ff' : 'white',
    color: isSelected ? 'white' : '#00b7ff',
    ':hover': {
      background: '#00b7ff',
      color: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    cursor: 'pointer'
  });
  const handleChipSelect = (label) => {
    setSelectedChips([]);
    setSelectedChips([label]);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };
  return (
    <div>
      <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
        <Row>
          <Col lg="3">
            <SearchBox placeHolder={'Search here'}></SearchBox>
          </Col>
          <Col lg="2">
            <DateSelector size="smaller" customLabel="From"></DateSelector>
          </Col>
          <Col lg="2">
            <DateSelector customLabel="To"></DateSelector>
          </Col>
          <Col lg="2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        <Row className="mt-3">
          <Stack direction="row" spacing={1}>
            <p style={{ color: '#6B778C' }}>Filter by : </p>
            {filterOptions.map((filterOption, index) => (
              <Chip
                key={index}
                label={filterOption}
                color={selectedChips.includes(filterOption) ? 'primary' : 'default'}
                onClick={() => handleChipSelect(filterOption)}
                sx={chipStyle(selectedChips.includes(filterOption))}
              />
            ))}
          </Stack>
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
}

export default PendingPayments;
