import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../components/helper/SearchBox.jsx';
import DateSelector from '../components/helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../css/index.css';
import ProcurementTable from '../components/procurement/ProcurementTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NewProcurement from '../components/procurement/NewProcurement.jsx';
import ProcurementDetails from '../components/procurement/ProcurementDetails.jsx';
import {
  proTableHeaders,
  proTableColumns,
  RESPONSE_MSG
} from '../components/tapicoPurchase/tp.const.js';
// API
import ProService from 'services/purchase.api.js';
import { SERVICES } from '../services/api.const.js';

import { isNumeric } from '../components/helper/helper.js';
import Toaster from '../components/helper/Snackbar.jsx';
import GenericService from '../services/generic.api';

function Procurements() {
  const [procurementData, setProcurementData] = useState([]);
  const [totalProDataCount, setTotalProDataCount] = useState(0);

  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedChips, setSelectedChips] = useState(['All']);
  const [page, setPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [searchPayload, setSearchPayload] = useState({});
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Procurement data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [selectedPro, setSelectedPro] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    invokeProcurementListAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, []);

  const invokeProcurementListAPI = (payload, query = null) => {
    ProService.getData(SERVICES.TP.QUERY_PARAMS.PROCUREMENT, payload, query)
      .then((response) => {
        // setCurrentRowsPerPage(currentRowsPerPage);
        setProcurementData(response.data.data);
        setTotalProDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching Purchase data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedPro(clickedRow);
    setShowDetails(true);

    console.log(selectedPro, 'selectedPro');
    console.log('Procurement table row clicked');
  };

  const onDeleteList = (shouldShow) => {
    setShowDetails(shouldShow);
    invokeProcurementListAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  const onSearchBoxValueChange = (currentInputValue) => {
    setPage(0);
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...searchPayload,
      ...{
        [isPhoneNumberSearch ? 'phone' : 'search_term']: currentInputValue
      }
    };
    setSearchPayload(payload);
    invokeProcurementListAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  const proPageChanged = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokeProcurementListAPI(
      searchPayload,
      `page=${currentPageNo + 1}&limit=${currentRowsPerPage}`
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokeProcurementListAPI(
      searchPayload,
      `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`
    );
  };

  // Just a generic method to invoke toaster
  const invokeToaster = (msg, backgroundClr = null) => {
    if (msg) {
      setToasterMsg(msg);
    }
    if (backgroundClr) {
      setToasterBackground(backgroundClr);
      setShouldShowToaster(Math.random());
    }
    // setShouldShowToaster(true);
  };

  const onProcurementSave = (newAddedProcurement) => {
    invokeToaster();
    showForm(false);
    // updateShowTPBackBtn(false);
    setProcurementData((procurement) => [newAddedProcurement, ...procurement]);
    invokeProcurementListAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  const hanldeAddProcurementFormClick = () => {
    GenericService.getInvoiceNo('PROCUREMENT')
      .then((response) => {
        setInvoiceNumber(response.data.invoiceNumber);
      })
      .catch((error) => {
        console.log('Error in getting customer data', error);
      });

    showForm(true);
    // updateShowTPBackBtn(true);
  };

  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  const handleChangePage = (shouldShow) => {
    showForm(shouldShow);
    setShowDetails(shouldShow);
  };

  const filterOptions = [
    { displayLabel: 'All', value: 'All' },
    { displayLabel: 'Paid', value: 'PAID' },
    { displayLabel: 'Unpaid', value: 'NOT_PAID' }
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
    let payload = searchPayload;
    if (labelObj.displayLabel === 'All') {
      setSelectedChips(['All']);
      setSearchPayload((searchPayload) => ({
        ...searchPayload,
        payment_status: ['All']
      }));
      payload = { ...payload, payment_status: ['All'] };
      invokeProcurementListAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
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
      payment_status: [...updatedChipSet]
    }));
    payload = { ...payload, payment_status: [...updatedChipSet] };

    invokeProcurementListAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
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
    invokeProcurementListAPI(apiPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, [fromDate, toDate]);

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px', alignItems: 'center' }}>
        <Col>
          {showNewForm || showDetails ? (
            <ArrowBackIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleChangePage(false);
              }}
              fontSize="medium"
            />
          ) : (
            ''
          )}
          <span>&nbsp;&nbsp;</span>{' '}
          {showNewForm ? 'New Procurements' : <> {showDetails ? 'Purchase' : 'Procurement'}</>}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showNewForm ? (
            <NewProcurement procurementAdded={onProcurementSave} proInvoiceNo={invoiceNumber} />
          ) : (
            <>
              {' '}
              {showDetails && selectedPro ? (
                <ProcurementDetails selectedPro={selectedPro} onDeleteListApi={onDeleteList} />
              ) : (
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
                        <DateSelector
                          dateChangeHanlder={onDateChange}
                          customLabel="To"></DateSelector>
                      </Col>
                      <Col lg="3" className="d-flex justify-content-end">
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
                      <Col lg="2" className="d-flex justify-content-end">
                        <Button
                          sx={{
                            borderColor: '#00B7FF',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '2px solid',
                            color: '#00B7FF',
                            font: '14px',
                            textTransform: 'none',
                            fontWeight: 'bold'
                          }}
                          variant="outlined"
                          onClick={() => hanldeAddProcurementFormClick(true)}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New Procurement
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Stack direction="row" spacing={1}>
                        <p style={{ color: '#6B778C' }}>Filter by : </p>
                        {filterOptions.map((filterOptionObj, index) => (
                          <Chip
                            key={index}
                            label={filterOptionObj.displayLabel}
                            color={
                              selectedChips.includes(filterOptionObj.value) ? 'primary' : 'default'
                            }
                            onClick={() => handleChipSelect(filterOptionObj)}
                            sx={chipStyle(selectedChips.includes(filterOptionObj.value))}
                          />
                        ))}
                      </Stack>
                    </Row>
                  </div>
                  <div>
                    {procurementData.length ? (
                      <ProcurementTable
                        tableData={procurementData}
                        proTableHeaders={proTableHeaders}
                        proTableColumns={proTableColumns}
                        totalproDataCount={totalProDataCount}
                        hanldePageChange={proPageChanged}
                        tableRowClicked={onTableRowClick}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        rowsPerPage={currentRowsPerPage}
                        page={page}
                      />
                    ) : (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
      <Toaster
        shouldOpen={shouldShowToaster}
        message={toasterMsg}
        backgroundColor={toasterBackground}></Toaster>
    </Container>
  );
}

export default Procurements;
