import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SearchBox from '../helper/SearchBox.jsx';
import DateSelector from '../helper/DateSelector.jsx';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../css/index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AllPaymentsTable from './AllPaymentsTable.jsx';
import { tableColumns, tableHeaders } from './payment.const.js';
import GeneralService from 'services/generic.api';

function AllPayments() {
  const [selectedChips, setSelectedChips] = useState(['All']);
  const [allPayments, setAllPayments] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [page, setPage] = useState(0);

  const filterOptions = ['All', 'Sales', 'Procurement', 'Expense', 'Topico Purchase'];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
    if (label === 'All') {
      setSelectedChips(['All']);
      invokeSearchAPI({ payment_category: ['All'] });
      return;
    }

    const updatedChipSet = new Set(selectedChips);

    if (updatedChipSet.has('All')) {
      updatedChipSet.delete('All');
    }

    if (updatedChipSet.has(label)) {
      updatedChipSet.delete(label);
    } else {
      updatedChipSet.add(label);
    }

    setSelectedChips([...updatedChipSet]);
    invokeSearchAPI({ payment_category: [...updatedChipSet] });
  };

  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI({}, `page=${0 + 1}&limit=${10}`);
  }, []);
  const invokeSearchAPI = (payload, query = null) => {
    GeneralService.getPayments(payload, query)
      .then((response) => {
        const pendingPayments = response.data.filter((payment) => {
          return payment?.payment_status === 'PAID';
        });
        setAllPayments(pendingPayments);
      })
      .catch((error) => {
        console.log('Error in getPayments', error);
      });
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  const pageChanged = (currentPageNo, rowsPerPage) => {
    setPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
  };

  const onSearchBoxValueChange = (currentInputValue) => {
    const payload = {
      search_term: currentInputValue
    };
    invokeSearchAPI(payload, `page=${0 + 1}&limit=${10}`);
  };

  return (
    <div style={{ padding: '0 12px', margin: '0 28px' }}>
      <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
        <Row>
          <Col lg="3">
            <SearchBox
              placeHolder={'Search here'}
              inputValueChanged={onSearchBoxValueChange}></SearchBox>
          </Col>
          <Col lg="2">
            <DateSelector size="smaller" customLabel="From"></DateSelector>
          </Col>
          <Col lg="2">
            <DateSelector customLabel="To"></DateSelector>
          </Col>
          <Col lg="4" className="d-flex justify-content-end">
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
        {allPayments?.length > 0 ? (
          <AllPaymentsTable
            tableData={allPayments}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            tableHeaders={tableHeaders}
            tableColumns={tableColumns}
            totalDataCount={totalDataCount}
            hanldePageChange={pageChanged}
            rowsPerPage={rowsPerPage}
            page={page}
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

export default AllPayments;
