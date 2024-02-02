import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../components/helper/SearchBox.jsx';
import DateSelector from '../components/helper/DateSelector.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../css/index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import GsInvoiceDetails from 'components/invoice/GsInvoiceDetails.jsx';
// import DcSalesInvoices from 'components/Invoice/DcInvoicesDetails.jsx';
import TsInvoiceDetails from '../components/invoice/TsInvoiceDetails.jsx';
import InvoiceTable from 'components/invoice/InvoiceTable.jsx';
import SaleService from 'services/sale.api.js';
import { SERVICES } from 'services/api.const.js';
import { useUpdateShowSalesBackBtn } from '../store/store.js';
import { invoiceTableColumns, invoiceTableHeaders } from 'components/sales/sale.const.js';
import DcDetails from 'components/sales/DcSales/DcDetails.jsx';
import TsDetails from 'components/sales/TS/TsDetails.jsx';
import GsDetails from 'components/sales/GS/GsDetails.jsx';

function Invoices() {
  const [salesInvoices, setsalesInvoices] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedChips, setSelectedChips] = useState(['All']);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const updateShowSalesBackBtn = useUpdateShowSalesBackBtn(); // Method to update bool, if back btn is clicked
  const [selectedRowData, setSelectedRowData] = useState({});
  const [showSaleDetails, setShowSaleDetails] = useState(false);
  const [page, setPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchPayload, setSearchPayload] = useState({ payment_status: ['All'] });
  const [selectedValue, setSelectedValue] = useState('all');

  const invokeSearchAPI = (payload, query = null, type) => {
    SaleService.getSales(SERVICES.SALE.SALE_TYPES[type], payload, query)
      .then((response) => {
        setRowsPerPage(rowsPerPage);
        setsalesInvoices(response.data.data);
        setTotalDataCount(response.data.totalCount);
      })
      .catch((error) => {
        console.log('Error in searching sale invoices', error);
      });
  };

  const invoicePageChanged = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`, selectedValue);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokeSearchAPI(
      searchPayload,
      `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`,
      selectedValue
    );
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedRowData(clickedRow);

    // Show back btn - Store
    updateShowSalesBackBtn(true);
    setShowSaleDetails(true);
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
    invokeSearchAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`, selectedValue);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${rowsPerPage}`, event.target.value);
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
      invokeSearchAPI(payload, `page=${0 + 1}&limit=${rowsPerPage}`, selectedValue);
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

    invokeSearchAPI(payload, `page=${0 + 1}&limit=${rowsPerPage}`, selectedValue);
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
    invokeSearchAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`, selectedValue);
  }, [fromDate, toDate]);

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px', alignItems: 'center' }}>
        <Col>
          {showSaleDetails ? (
            <ArrowBackIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowSaleDetails(false);
              }}
              fontSize="medium"
            />
          ) : (
            ''
          )}
          <span>&nbsp;&nbsp;</span> {showDetails ? 'Invoices' : 'Invoices history'}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showSaleDetails ? (
            selectedRowData.sale_type === 'dc' ? (
              <DcDetails selectedRowData={selectedRowData} />
            ) : selectedRowData.sale_type === 'tippi' ? (
              <TsDetails selectedRowData={selectedRowData} />
            ) : (
              <GsDetails selectedRowData={selectedRowData} />
            )
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
                    <FormControl
                      sx={{ m: 1, minWidth: 220, marginTop: '0px', backgroundColor: 'white' }}
                      size="small">
                      <InputLabel id="demo-select-small-label">Select</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        label="Select"
                        value={selectedValue}
                        onChange={handleSelectChange}>
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'dc'}>Delivery Challan</MenuItem>
                        <MenuItem value={'tippi'}>Thippi Sales</MenuItem>
                        <MenuItem value={'general'}>General Sales</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  <Col lg="2">
                    <DateSelector
                      size="smaller"
                      dateChangeHanlder={onDateChange}
                      customLabel="From"></DateSelector>
                  </Col>
                  <Col lg="2">
                    <DateSelector customLabel="To" dateChangeHanlder={onDateChange}></DateSelector>
                  </Col>
                  <Col lg="3" style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                {salesInvoices?.length > 0 ? (
                  <InvoiceTable
                    tableData={salesInvoices}
                    tableHeaders={invoiceTableHeaders}
                    tableColumns={invoiceTableColumns}
                    totalDataCount={totalDataCount}
                    tableRowClicked={onTableRowClick}
                    handleChangePage={invoicePageChanged}
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
        </Col>
      </Row>
    </Container>
  );
}

export default Invoices;
