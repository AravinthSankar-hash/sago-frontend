import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../../helper/SearchBox.jsx';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../../css/index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DcDetails from './DcDetails.jsx';
import NewDcSalesForm from './NewDcSalesForm.jsx';
import DcTable from './DcTable.jsx';
import {
  useUpdateShowSalesBackBtn,
  useShowDCSalesNewForm,
  useUpdateShowDCSalesNewForm,
  useShowDCDetails,
  useUpdateShowDCDetails
} from '../../../store/store.js';
import Toaster from '../../helper/Snackbar.jsx';
import { RESPONSE_MSG, dcTableHeaders, dcTableColumns } from '../sale.const.js';
// API services
import SaleService from 'services/sale.api.js';
import { SERVICES } from 'services/api.const.js';
import GenericService from '../../../services/generic.api.js';

const Dc = () => {
  const [salesInvoices, setsalesInvoices] = useState([]);
  const [totalInvoicesDataCount, setTotalInvoicesDataCount] = useState(0);
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('DC Sales data saved');
  const [selectedChips, setSelectedChips] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [searchPayload, setSearchPayload] = useState({});
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // Store
  const updateShowSalesBackBtn = useUpdateShowSalesBackBtn(); // Method to update bool, if back btn is clicked
  const showDCSalesNewForm = useShowDCSalesNewForm(); // Show Sales Add form
  const updateShowDCSalesNewForm = useUpdateShowDCSalesNewForm(); // Show Sales Dashboard
  const showDCDetails = useShowDCDetails(); // Show DC Details Dashboard
  const updateShowDCDetails = useUpdateShowDCDetails(); // Show DC Details Dashboard

  const invokeSearchAPI = (payload, query = null) => {
    SaleService.getSales(SERVICES.SALE.SALE_TYPES.dc, payload, query)
      .then((response) => {
        setRowsPerPage(rowsPerPage);
        setsalesInvoices(response.data.data);
        setTotalInvoicesDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching sale invoices', error);
        invokeToaster(RESPONSE_MSG.FAILED, 'red');
      });
  };

  const invokeToaster = (msg, backgroundClr = '#4BB543') => {
    if (msg) {
      setToasterMsg(msg);
    }
    setToasterBackground(backgroundClr);
    setShouldShowToaster(Math.random());
  };

  const hanldeAddSaleFormClick = () => {
    GenericService.getInvoiceNo('DC')
      .then((response) => {
        setInvoiceNumber(response.data.invoiceNumber);
      })
      .catch((error) => {
        console.log('Error in getting customer data', error);
      });

    updateShowDCSalesNewForm(true);
    updateShowSalesBackBtn(true);
  };

  const showForm = (shouldShow) => {
    // Show back btn - Store
    updateShowSalesBackBtn(shouldShow);

    // Show Add Sales form - Store
    updateShowDCSalesNewForm(shouldShow);
  };

  const onDCSave = (newAddedDC) => {
    invokeToaster();
    showForm(false);
    // updateShowTPBackBtn(false);
    setsalesInvoices((DC) => [newAddedDC, ...DC]);
    // invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  };

  const dcPageChanged = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedRowData(clickedRow);

    // Show back btn - Store
    updateShowSalesBackBtn(true);
    // Store update
    updateShowDCDetails(true);
  };

  const onDeleteList = (shouldShow) => {
    updateShowSalesBackBtn(shouldShow);
    updateShowDCDetails(shouldShow);
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
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
      invokeSearchAPI(payload, `page=${0 + 1}&limit=${rowsPerPage}`);
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

    invokeSearchAPI(payload, `page=${0 + 1}&limit=${rowsPerPage}`);
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
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  }, [fromDate, toDate]);
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showDCSalesNewForm ? (
            <NewDcSalesForm dcAdded={onDCSave} dcInvoiceNo={invoiceNumber} />
          ) : (
            <>
              {' '}
              {showDCDetails ? (
                <DcDetails selectedRowData={selectedRowData} onDeleteListApi={onDeleteList} />
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
                      <Col lg="2">
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
                          onClick={() => hanldeAddSaleFormClick(true)}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New Sales
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
                    {salesInvoices.length > 0 ? (
                      <DcTable
                        tableData={salesInvoices}
                        tableHeaders={dcTableHeaders}
                        tableColumns={dcTableColumns}
                        totalDataCount={totalInvoicesDataCount}
                        handleChangePage={dcPageChanged}
                        tableRowClicked={onTableRowClick}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
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
};

export default Dc;
