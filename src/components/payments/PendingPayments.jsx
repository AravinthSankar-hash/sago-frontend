import { useEffect, useState } from 'react';
import GeneralService from 'services/generic.api';
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
import PendingPaymentsTable from './PendingPaymentsTables';
import { tableColumns, tableHeaders } from './payment.const.js';

function PendingPayments() {
  const [selectedChips, setSelectedChips] = useState(['All']);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchPayload, setSearchPayload] = useState({ payment_status: 'NOT_PAID' });

  const filterOptions = [
    { displayLabel: 'All', value: 'All' },
    { displayLabel: 'Sales', value: 'sale' },
    { displayLabel: 'Procurement', value: 'procurement' },
    { displayLabel: 'Expense', value: 'expense' },
    { displayLabel: 'Topico Purchase', value: 'tp' }
  ];

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

  const handleChipSelect = (labelObj) => {
    if (labelObj.displayLabel === 'All') {
      setSelectedChips(['All']);
      setSearchPayload((searchPayload) => ({
        ...searchPayload,
        payment_category: ['All']
      }));
      invokeSearchAPI(
        { payment_category: ['All'], payment_status: 'NOT_PAID' },
        `page=${0 + 1}&limit=${rowsPerPage}`
      );
      return;
    }

    const updatedChipSet = new Set(selectedChips);
    console.log(selectedChips, 'selectedChips');

    if (updatedChipSet.has('All')) {
      updatedChipSet.delete('All');
    }

    if (updatedChipSet.has(labelObj.value)) {
      updatedChipSet.delete(labelObj.value);
    } else {
      updatedChipSet.add(labelObj.value);
    }

    if (!updatedChipSet.size) {
      updatedChipSet.add('All');
    }

    setSelectedChips([...updatedChipSet]);
    setPage(0);
    setSearchPayload((searchPayload) => ({
      ...searchPayload,
      payment_category: [...updatedChipSet]
    }));
    invokeSearchAPI(
      { payment_category: [...updatedChipSet], payment_status: 'NOT_PAID' },
      `page=${0 + 1}&limit=${rowsPerPage}`
    );
  };

  const invokeSearchAPI = (payload, query = null) => {
    GeneralService.getPayments(payload, query)
      .then((response) => {
        setRowsPerPage(rowsPerPage);
        setTotalDataCount(response.data.totalCount);
        setPendingPayments(response.data.data);
      })
      .catch((error) => {
        console.log('Error in getPayments', error);
      });
  };

  const pageChanged = (currentPageNo, rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const onSearchBoxValueChange = (currentInputValue) => {
    let apiPayload = {};
    setSearchPayload((existingPayload) => {
      apiPayload = {
        ...existingPayload,
        search_term: currentInputValue
      };

      return apiPayload;
    });
    invokeSearchAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  };

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const onDateChange = (selectedDate, dateType) => {
    if (!selectedDate) {
      // If the date is not selected, reset the corresponding state
      if (dateType === 'from') {
        setFromDate(null);
      } else if (dateType === 'to') {
        setToDate(null);
      }
      setSearchPayload((existingPayload) => ({
        ...existingPayload,
        [`${dateType}_date`]: undefined
      }));
    } else {
      // If the date is selected, update the corresponding state
      setSearchPayload((existingPayload) => ({
        ...existingPayload,
        [`${dateType}_date`]: selectedDate
      }));
      if (dateType === 'from') {
        setFromDate(selectedDate);
      } else if (dateType === 'to') {
        setToDate(selectedDate);
      }
    }
  };
  useEffect(() => {
    let apiPayload = searchPayload;
    // Check if any fromDate and toDate are missing
    if (!fromDate || !toDate) {
      apiPayload = {
        ...searchPayload,
        from_date: undefined,
        to_date: undefined
      };
    }
    invokeSearchAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  }, [fromDate, toDate]);

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
            <DateSelector
              size="smaller"
              dateChangeHanlder={onDateChange}
              customLabel="From"></DateSelector>
          </Col>
          <Col lg="2">
            <DateSelector dateChangeHanlder={onDateChange} customLabel="To"></DateSelector>
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
            {filterOptions.map((filterOptionObj, index) => (
              <Chip
                key={index}
                label={filterOptionObj.displayLabel}
                // color={selectedChips.includes(filterOptionObj.value) ? 'primary' : 'default'}
                onClick={() => handleChipSelect(filterOptionObj)}
                sx={chipStyle(selectedChips.includes(filterOptionObj.value))}
              />
            ))}
          </Stack>
        </Row>
      </div>
      <div>
        {pendingPayments?.length > 0 ? (
          <PendingPaymentsTable
            tableData={pendingPayments}
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

export default PendingPayments;
