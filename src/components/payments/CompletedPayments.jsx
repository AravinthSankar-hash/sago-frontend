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
import CompletedPaymentsTable from './CompletedPaymentsTable.jsx';
import { tableColumns, tableHeaders } from './payment.const.js';
import GeneralService from 'services/generic.api';

function CompletedPayments() {
  const [selectedChips, setSelectedChips] = useState(['All']);
  const [completedPayments, setCompletedPayments] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchPayload, setSearchPayload] = useState({ payment_status: 'PAID' });

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
      setSearchPayload((existingPayload) => {
        return {
          ...existingPayload,
          payment_category: ['All']
        };
      });
      invokeSearchAPI(
        {
          ...searchPayload,
          payment_category: ['All']
        },
        `page=${0 + 1}&limit=${rowsPerPage}`
      );
      return;
    }

    const updatedChipSet = new Set(selectedChips);

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
    setSearchPayload((existingPayload) => {
      return {
        ...existingPayload,
        payment_category: [...updatedChipSet]
      };
    });
    invokeSearchAPI(
      {
        ...searchPayload,
        payment_category: [...updatedChipSet]
      },
      `page=${0 + 1}&limit=${rowsPerPage}`
    );
  };

  const onSearchBoxValueChange = (currentInputValue) => {
    let apiPayload = {};
    setPage(0);
    setSearchPayload((existingPayload) => {
      apiPayload = {
        ...existingPayload,
        search_term: currentInputValue
      };

      return apiPayload;
    });
    invokeSearchAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  };

  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  }, []);
  const invokeSearchAPI = (payload, query = null) => {
    GeneralService.getPayments(payload, query)
      .then((response) => {
        setTotalDataCount(response.data.totalCount);
        setCompletedPayments(response.data.data);
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
            {filterOptions.map((filterOptionObj, index) => (
              <Chip
                key={index}
                label={filterOptionObj.displayLabel}
                // color={selectedChips.includes(filterOption) ? 'primary' : 'default'}
                onClick={() => handleChipSelect(filterOptionObj)}
                sx={chipStyle(selectedChips.includes(filterOptionObj.value))}
              />
            ))}
          </Stack>
        </Row>
      </div>
      <div>
        {completedPayments?.length > 0 ? (
          <CompletedPaymentsTable
            tableData={completedPayments}
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

export default CompletedPayments;
